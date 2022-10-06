import { AutoMap } from '@automapper/classes'
import { VenueShortDto } from './response/venueShort.dto'
import { EventShortDto } from 'src/modules/events/application/dto/response/eventShort.dto'

export class VenuesScheduleListDto {
	@AutoMap()
	id: string

	@AutoMap(() => Date)
	date: Date

	@AutoMap()
	startTime: string

	@AutoMap()
	endTime: string

	@AutoMap(() => VenueShortDto)
	venue: VenueShortDto

	@AutoMap()
	venueId: string

	@AutoMap(() => EventShortDto)
	event: EventShortDto

	@AutoMap()
	eventId: string

	@AutoMap(() => Date)
	declinedAt: Date

	@AutoMap(() => Date)
	approvedAt: Date

	@AutoMap(() => Date)
	confirmedAt: Date

	@AutoMap(() => Date)
	canceledAt: Date

	@AutoMap()
	status: string

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date
}
