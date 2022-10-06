import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Brackets, DataSource, FindOptionsWhere } from 'typeorm'
import { Venue } from '../../domain/entities/venues.entity'
import CreateScheduleItemDto from '../dto/createScheduleItem.dto'
import UpdateVenueDto from '../dto/updateVenue.dto'
import CreateVenueDto from '../dto/createVenue.dto'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import { TagsService } from '../../../tags/application/services/tags.service'
import { ResourcesService } from '../../../resources/application/services/resources.service'
import { VenueScheduleItem } from '../../domain/entities/venueScheduleItem.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { VenueScheduleItemStatusesEnum } from '../../domain/enums/venueScheduleItemStatuses.enum'
import { VenuesFilterManager } from '../filters/venues.filterManager'

@Injectable()
export class VenuesService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly tagsService: TagsService,
		private readonly resourcesService: ResourcesService,
	) {}

	async dataMapping(
		coverId?: string,
		resourcesIds?: string[],
		propertiesIds?: string[],
		attributesIds?: string[],
	) {
		const data = {} as Venue

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

		if (propertiesIds?.length || attributesIds?.length) {
			const tags = await this.tagsService.getByIds(
				[].concat(attributesIds, propertiesIds),
			)
			data.properties = tags.filter((tag) => propertiesIds.includes(tag.id))
			data.attributes = tags.filter((tag) => attributesIds.includes(tag.id))
		}

		return data
	}

	create(body: CreateVenueDto, authUser) {
		return this.dataSource.transaction(async () => {
			const venue = Venue.create()
			const data = await this.dataMapping(
				body.coverId,
				body.resourcesIds,
				body.propertiesIds,
				body.attributesIds,
			)
			Object.assign(venue, { ...body, ...data })
			venue.owner = authUser

			await venue.save()

			return venue
		})
	}

	getFiltered(query) {
		return this.dataSource.transaction(async () => {
			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
				$filters: VenuesFilterManager.transformForResponse(),
			}

			const venues = Venue.createQueryBuilder('venues')
			.leftJoinAndMapMany(
				'venues.resources',
				'venues.resources',
				'resources',
			).leftJoinAndMapMany(
				'venues.communications',
				'venues.communications',
				'communications',
			).leftJoinAndMapMany(
				'venues.properties',
				'venues.properties',
				'properties',
			).leftJoinAndMapMany(
				'venues.attributes',
				'venues.attributes',
				'attributes',
			).leftJoinAndMapOne(
				'venues.owner',
				'venues.owner',
				'owner',
			).leftJoinAndMapMany(
				'owner.communications',
				'owner.communications',
				'owner_communications',
			)

			FindService.apply(venues, this.dataSource, Venue, 'venues', query.query)
			SortService.apply(venues, this.dataSource, Venue, 'venues', query.sort)
			venues.andWhere(
				new Brackets((qb) => {
					return query.filter
						? VenuesFilterManager.apply(qb, query.filter)
						: {}
				})
			)

			await venues
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

	getById(id: string): Promise<Venue> {
		return this.dataSource.transaction(async () => {
			const venue = await Venue.findOne({
				where: { id },
				relations: [
					'resources',
					'communications',
					'properties',
					'attributes',
					'owner',
					'owner.communications',
				],
			})

			if (!venue) {
				throw new HttpException(
					{
						message: 'Venue not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return venue
		})
	}

	update(id: string, body: UpdateVenueDto): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const venue = await Venue.findOneOrFail({
				where: { id },
				relations: ['resources', 'properties', 'attributes'],
			})

			const data = await this.dataMapping(
				body.coverId,
				body.resourcesIds,
				body.propertiesIds,
				body.attributesIds,
			)

			em.getRepository(Venue).merge(venue, { ...body, ...data })

			await venue.save()
		})
	}

	delete(id: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			await this.getById(id)
			await em.getRepository(Venue).softDelete(id)
		})
	}

	getSchedule(id: string, query) {
		return this.dataSource.transaction(async () => {
			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const schedule = VenueScheduleItem.createQueryBuilder('schedule')
				.leftJoinAndMapOne(
					'schedule.venue',
					'schedule.venue',
					'venue',
					'venue.id  = :venueId',
					{ venueId: id },
				)
				.leftJoinAndMapMany('venue.resources', 'venue.resources', 'resources')
				.leftJoinAndMapOne('schedule.event', 'schedule.event', 'event')
				.leftJoinAndMapOne('event.organizer', 'event.organizer', 'organizer')

			FindService.apply(
				schedule,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.query,
			)
			SortService.apply(
				schedule,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.sort,
			)

			await schedule
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

	async createScheduleItem(
		id: string,
		body: CreateScheduleItemDto,
	): Promise<VenueScheduleItem> {
		return this.dataSource.transaction(async () => {
			const schedule = VenueScheduleItem.create()
			Object.assign(schedule, body)
			schedule.venue = await Venue.findOneByOrFail({ id: id })
			schedule.event = await Event.findOneByOrFail({ id: body.eventId })
			await schedule.save()
			return schedule
		})
	}

	async approveScheduleItem(id: string, scheduleId: string): Promise<void> {
		await this.dataSource.transaction(async () => {
			await VenueScheduleItem.update(
				{
					id: scheduleId,
					venue: {
						id,
					},
				},
				{
					status: VenueScheduleItemStatusesEnum.APPROVED,
					approvedAt: new Date(),
				},
			)
		})
	}

	async declineScheduleItem(
		venueId: string,
		venueScheduleId: string,
	): Promise<void> {
		await this.dataSource.transaction(async () => {
			await VenueScheduleItem.update(
				{
					id: venueScheduleId,
					venue: {
						id: venueId,
					},
				},
				{
					status: VenueScheduleItemStatusesEnum.DECLINED,
					declinedAt: new Date(),
				},
			)
		})
	}

	async scheduleItemFindOneByOrFail(
		criteria: FindOptionsWhere<VenueScheduleItem>,
	): Promise<VenueScheduleItem> {
		return this.dataSource.transaction(async () => {
			const item = VenueScheduleItem.findOneBy(criteria)

			if (!item) {
				throw new HttpException(
					{
						message: 'VenueScheduleItem not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return item
		})
	}
}
