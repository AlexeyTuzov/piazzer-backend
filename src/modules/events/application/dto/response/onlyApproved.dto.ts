import { AutoMap } from '@automapper/classes'
import { VenueResponseDto } from 'src/modules/venues/application/dto/response/venue.response.dto'
import { EventResponseDto } from './event.response.dto'

export class OnlyApproved {
	@AutoMap(() => EventResponseDto)
	event: EventResponseDto

	venue: VenueResponseDto

	@AutoMap()
	dateStart: Date

	@AutoMap()
	dateEnd: Date
}
