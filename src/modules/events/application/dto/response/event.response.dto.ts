import { AutoMap } from '@automapper/classes'
import { ResourcesResponseDto } from 'src/modules/resources/application/dto/resources.response.dto'
import { CommunicationResponseDto } from 'src/modules/users/application/dto/response/communication.response.dto'
import { UserShortDto } from 'src/modules/users/application/dto/response/userShort.dto'
import { VenueShortDto } from 'src/modules/venues/application/dto/venueShort.dto'

export class EventResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	isDraft: boolean

	@AutoMap()
	title: string

	@AutoMap()
	coverId: string

	@AutoMap(() => UserShortDto)
	organizer: UserShortDto

	@AutoMap()
	description: string

	@AutoMap(() => [ResourcesResponseDto])
	resources: ResourcesResponseDto[]

	@AutoMap(() => [CommunicationResponseDto])
	communications: CommunicationResponseDto[]

	@AutoMap(() => VenueShortDto)
	venue: VenueShortDto

	@AutoMap()
	resourcesIds: string[]

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date
}
