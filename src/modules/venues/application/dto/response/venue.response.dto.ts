import { AutoMap } from '@automapper/classes'
import { CommunicationResponseDto } from 'src/modules/communications/application/dto/response/communication.response.dto'
import { TagResponseDto } from 'src/modules/tags/application/dto/response/tag.response.dto'
import { ResourcesResponseDto } from '../../../../resources/application/dto/response/resources.response.dto'
import { UserShortDto } from '../../../../users/application/dto/response/userShort.dto'
import CoordinatesResponseDto from './coordinates.response.dto'
import { VenuesScheduleListDto } from "../venuesScheduleList.dto";

export class VenueResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	title: string

	@AutoMap()
	address: string

	@AutoMap()
	coverId: string

	@AutoMap(() => ResourcesResponseDto)
	resources: ResourcesResponseDto

	@AutoMap()
	city: string

	@AutoMap()
	short: string

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date

	@AutoMap(() => CoordinatesResponseDto)
	coordinates: CoordinatesResponseDto

	@AutoMap(() => [CommunicationResponseDto])
	communications: CommunicationResponseDto[]

	@AutoMap()
	contactPerson: string

	@AutoMap()
	description: string

	@AutoMap(() => [TagResponseDto])
	properties: TagResponseDto[]

	@AutoMap(() => [TagResponseDto])
	attributes: TagResponseDto[]

	@AutoMap()
	capacity: number

	@AutoMap()
	cost: number

	@AutoMap()
	isBlocked: boolean

	@AutoMap()
	isDraft: boolean

	@AutoMap(() => UserShortDto)
	owner: UserShortDto //TODO Owner DTO

	@AutoMap()
	position: string

	@AutoMap(() => [VenuesScheduleListDto])
	scheduleItems: VenuesScheduleListDto[]
}
