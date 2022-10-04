import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ResourcesService } from 'src/modules/resources/application/services/resources.service'
import { DataSource } from 'typeorm'
import { Event } from '../../domain/entities/events.entity'
import { CreateEventDto } from '../dto/createEvent.dto'
import { CommunicationsService } from 'src/modules/communications/application/services/communications.service'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import UpdateEventDto from '../dto/updateEvent.dto'

@Injectable()
export class EventsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly resourcesService: ResourcesService,
		private readonly communicationsService: CommunicationsService,
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

	getFiltered(query: ListingDto) {
		return this.dataSource.transaction(async () => {
			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const events = Event.createQueryBuilder('events').leftJoinAndMapOne(
				'events.organizer',
				'events.organizer',
				'organizer',
			)

			FindService.apply(events, this.dataSource, Event, 'events', query.query)
			SortService.apply(events, this.dataSource, Event, 'events', query.sort)

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

	getById(id: string) {
		return this.dataSource.transaction(async () => {
			const event = await Event.findOne({
				where: { id },
				relations: [
					'organizer',
					'resources',
					'communications',
					'venue',
					'venue.resources',
				],
			})

			if (!event) {
				throw new HttpException(
					{
						message: 'Event not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return event
		})
	}

	update(id: string, body: UpdateEventDto): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const event = await Event.findOneOrFail({
				where: { id },
				relations: ['resources', 'communications'],
			})

			const data = await this.dataMapping(body.coverId, body.resourcesIds)

			em.getRepository(Event).merge(event, { ...body, ...data })

			await event.save()
		})
	}

	delete(id: string) {
		return this.dataSource.transaction(async (em) => {
			await this.getById(id)
			await em.getRepository(Event).softDelete(id)
		})
	}

	getRequests() {
		return 'getRequests'
	}

	confirmRequest() {
		return 'confirmRequest'
	}

	cancelRequest() {
		return 'cancelRequest'
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
