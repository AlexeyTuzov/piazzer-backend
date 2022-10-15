import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ResourcesService } from 'src/modules/resources/application/services/resources.service'
import { Brackets, DataSource } from 'typeorm'
import { Event } from '../../domain/entities/events.entity'
import { CreateEventDto } from '../dto/createEvent.dto'
import { CommunicationsService } from 'src/modules/communications/application/services/communications.service'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import UpdateEventDto from '../dto/updateEvent.dto'
import SchedulerService from 'src/infrastructure/scheduler/scheduler.service'
import { VenueScheduleItem } from 'src/modules/venues/domain/entities/venueScheduleItem.entity'
import { VenueScheduleItemStatusesEnum } from 'src/modules/venues/domain/enums/venueScheduleItemStatuses.enum'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { AccessControlService } from 'src/infrastructure/access-control/service/access-control.service'
import ScopesEnum from 'src/infrastructure/access-control/enums/scopes.enum'
import { EventsFilterManager } from '../filters/events.filterManager'

@Injectable()
export class EventsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly resourcesService: ResourcesService,
		private readonly communicationsService: CommunicationsService,
		private readonly schedulerService: SchedulerService,
		private readonly accessControlService: AccessControlService,
	) {}

	create(creator, body: CreateEventDto) {
		return this.dataSource.transaction(async () => {
			const event = Event.create()
			const data = await this.dataMapping(body.coverId, body.resourcesIds)
			Object.assign(event, { ...body, ...data })
			event.organizer = creator

			await event.save()

			await this.communicationsService.communicationAddToEvent(
				event.id,
				body.communications,
			)

			return event
		})
	}

	getFiltered(query: ListingDto, userId?: string) {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)

			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
				$filters: EventsFilterManager.transformForResponse(),
			}

			const events = Event.createQueryBuilder('events')
				.leftJoinAndMapOne('events.organizer', 'events.organizer', 'organizer')
				.leftJoinAndMapMany('events.resources', 'events.resources', 'resources')
				.leftJoinAndMapMany(
					'events.communications',
					'events.communications',
					'communications',
				)
				.leftJoinAndMapOne('events.venue', 'events.venue', 'venue')

			if (scopes.includes(ScopesEnum.ALL)) {
				events.withDeleted()
			} else if (scopes.includes(ScopesEnum.AVAILABLE)) {
				//TODO where
			}

			FindService.apply(events, this.dataSource, Event, 'events', query.query)
			SortService.apply(events, this.dataSource, Event, 'events', query.sort)
			events.andWhere(
				new Brackets((qb) => {
					return query.filter ? EventsFilterManager.apply(qb, query.filter) : {}
				}),
			)

			await events
				.skip((response.page - 1) * response.limit)
				.take(response.limit)
				.getManyAndCount()
				.then(([data, total]) => {
					response.data = data
					response.total = total
				})

			return response
		})
	}

	getById(eventId: string, userId?: string): Promise<Event> {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)

			const withDeleted = scopes.includes(ScopesEnum.ALL)

			const event = await Event.findOne({
				where: { id: eventId },
				relations: [
					'organizer',
					'resources',
					'communications',
					'venue',
					'venue.resources',
				],
				withDeleted,
			})

			if (!event || (event.isDraft && !userId)) {
				throw new HttpException(
					{
						message: 'Event not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			if (event.isDraft) {
				const user = await User.findOneOrFail({ where: { id: userId } })
				const organizerId = event.organizer.id
				this.accessControlService.checkOwnership(user, organizerId)
			}

			return event
		})
	}

	update(authUser: User, eventId: string, body: UpdateEventDto): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const event = await Event.findOneOrFail({
				where: { id: eventId },
				relations: ['resources', 'communications', 'organizer'],
			})
			const organizerId = event.organizer.id
			this.accessControlService.checkOwnership(authUser, organizerId)

			const data = await this.dataMapping(body.coverId, body.resourcesIds)

			em.getRepository(Event).merge(event, { ...body, ...data })
			event.resources = data.resources
			event.communications = data.communications

			await event.save()
		})
	}

	delete(authUser: User, eventId: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const event = await em.getRepository(Event).findOneOrFail({
				where: { id: eventId },
				relations: ['organizer'],
			})
			const organizerId = event.organizer.id
			this.accessControlService.checkOwnership(authUser, organizerId)
			await em.getRepository(Event).softDelete(eventId)
		})
	}

	getRequests(authUser: User, eventId: string, query: ListingDto) {
		return this.dataSource.transaction(async (em) => {
			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const event = await em.getRepository(Event).findOneOrFail({
				where: { id: eventId },
				relations: ['organizer'],
			})
			const organizerId = event.organizer.id
			this.accessControlService.checkOwnership(authUser, organizerId)

			const scheduleItems = VenueScheduleItem.createQueryBuilder('schedule')
				.where('schedule.eventId = :eventId', { eventId })
				.leftJoinAndMapOne('schedule.venue', 'schedule.venue', 'venue')
				.leftJoinAndMapMany('venue.resources', 'venue.resources', 'resources')
				.leftJoinAndMapOne('schedule.event', 'schedule.event', 'event')
				.leftJoinAndMapMany('event.organizer', 'event.organizer', 'organizer')

			FindService.apply(
				scheduleItems,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.query,
			)
			SortService.apply(
				scheduleItems,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.sort,
			)

			await scheduleItems
				.skip((response.page - 1) * response.limit)
				.take(response.limit)
				.getManyAndCount()
				.then(([data, total]) => {
					response.data = data
					response.total = total
				})

			return response
		})
	}

	confirmRequest(authUser: User, eventId: string, scheduleId: string) {
		return this.dataSource.transaction(async () => {
			const event = await Event.findOneOrFail({
				where: { id: eventId },
				relations: ['organizer'],
			})

			const scheduleItem = await VenueScheduleItem.findOneOrFail({
				where: { eventId: event.id, id: scheduleId },
			})

			const organizerId = event.organizer.id
			this.accessControlService.checkOwnership(authUser, organizerId)

			if (scheduleItem.status === VenueScheduleItemStatusesEnum.CONFIRMED) {
				throw new HttpException(
					{
						message: 'Event is already confirmed',
						code: 'FORBIDDEN',
						status: HttpStatus.FORBIDDEN,
					},
					HttpStatus.FORBIDDEN,
				)
			}

			const check = this.schedulerService.checkStatusChange(
				scheduleItem.status,
				VenueScheduleItemStatusesEnum.CONFIRMED,
			)

			if (!check) {
				throw new HttpException(
					{
						message: 'Event has not been approved by a venue owner yet',
						code: 'FORBIDDEN',
						status: HttpStatus.FORBIDDEN,
					},
					HttpStatus.FORBIDDEN,
				)
			}

			scheduleItem.status = VenueScheduleItemStatusesEnum.CONFIRMED
			scheduleItem.confirmedAt = new Date()
			await scheduleItem.save()
		})
	}

	cancelRequest(authUser: User, eventId: string, scheduleId: string) {
		return this.dataSource.transaction(async () => {
			const event = await Event.findOneOrFail({
				where: { id: eventId },
				relations: ['organizer'],
			})

			const scheduleItem = await VenueScheduleItem.findOneOrFail({
				where: { eventId: event.id, id: scheduleId },
			})

			const organizerId = event.organizer.id
			this.accessControlService.checkOwnership(authUser, organizerId)

			if (scheduleItem.status === VenueScheduleItemStatusesEnum.CANCELED) {
				throw new HttpException(
					{
						message: 'Event is already cancelled',
						code: 'FORBIDDEN',
						status: HttpStatus.FORBIDDEN,
					},
					HttpStatus.FORBIDDEN,
				)
			}

			const check = this.schedulerService.checkStatusChange(
				scheduleItem.status,
				VenueScheduleItemStatusesEnum.CANCELED,
			)

			if (!check) {
				throw new HttpException(
					{
						message: 'Event can not be cancelled now',
						code: 'FORBIDDEN',
						status: HttpStatus.FORBIDDEN,
					},
					HttpStatus.FORBIDDEN,
				)
			}

			scheduleItem.status = VenueScheduleItemStatusesEnum.CANCELED
			scheduleItem.canceledAt = new Date()
			await scheduleItem.save()
		})
	}

	private async dataMapping(coverId?: string, resourcesIds?: string[]) {
		const data = {} as Event

		if (resourcesIds?.length || coverId) {
			const resources = await this.resourcesService.getByIds(
				[].concat(resourcesIds, coverId),
			)
			data.resources = resources.filter((res) => resourcesIds.includes(res.id))

			if (coverId) {
				const coverIdInDB = resources.find((res) => res.id === coverId)?.id
				if (!coverIdInDB) {
					throw new HttpException(
						{
							message: 'Cover not found',
							code: 'NOT_FOUND_EXCEPTION',
							status: HttpStatus.NOT_FOUND,
						},
						HttpStatus.NOT_FOUND,
					)
				}
				data.coverId = resources.find((res) => res.id === coverId)?.id || null
			}
		}

		return data
	}
}
