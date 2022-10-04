import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ResourcesService } from 'src/modules/resources/application/services/resources.service'
import { DataSource } from 'typeorm'
import { Event } from '../../domain/entities/events.entity'
import { CreateEventDto } from '../dto/createEvent.dto'
import { CommunicationsService } from 'src/modules/communications/application/services/communications.service'

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

	getAll() {
		return 'getAll'
	}

	getOne() {
		return 'getOne'
	}

	update() {
		return 'update'
	}

	delete() {
		return 'delete'
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
