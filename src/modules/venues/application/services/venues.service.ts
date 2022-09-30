import { Injectable } from '@nestjs/common'
import { ResourcesService } from '../../../resources/application/services/resources.service'
import { UsersService } from '../../../users/application/services/users.service'
import { DataSource } from 'typeorm'
import { Venue } from '../../domain/entities/venues.entity'
import NotFoundError from '../../../../infrastructure/exceptions/not-found'
import CreateScheduleItemDto from '../dto/createScheduleItem.dto'
import UpdateVenueDto from '../dto/updateVenue.dto'
import CreateVenueDto from '../dto/createVenue.dto'

@Injectable()
export class VenuesService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly resourcesService: ResourcesService,
		private readonly usersService: UsersService,
	) {}

	create(body: CreateVenueDto) {
		return this.dataSource.transaction(async () => {
			const venue = {}
		})
	}

	getFiltered(dto): Promise<Venue[]> {
		return this.dataSource.transaction(async () => {
			return Venue.find()
		})
	}

	//TODO: add attributes and properties to relations!!!!
	getById(id: string): Promise<Venue> {
		return this.dataSource.transaction(async () => {
			const venue = await Venue.findOne({
				where: { id },
				relations: ['resources', 'attributes', 'properties'],
			})

			if (!venue) {
				throw new NotFoundError('Venue not found')
			}

			return venue
		})
	}

	update(id: string, dto: UpdateVenueDto): Promise<void> {
		return this.dataSource.transaction(async () => {
			await this.getById(id)
			await Venue.update(id, { ...dto })
		})
	}

	delete(id: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const venue = await this.getById(id)
			await em.softRemove(venue)
		})
	}

	getSchedule(id: string, dto) {}

	createScheduleItem(id: string, dto: CreateScheduleItemDto) {}

	approveScheduleItem(id: string, scheduleId: string) {}

	declineScheduleItem(id: string, scheduleId: string) {}
}
