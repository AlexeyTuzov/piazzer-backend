import { AutoMap } from '@automapper/classes'
import { ResourcesResponseDto } from '../../../resources/application/dto/resources.response.dto'
import { UserShortDto } from '../../../users/application/dto/response/userShort.dto'

export class VenueReadDto {
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

	@AutoMap()
	coordinates: any //TODO coordinates type

	@AutoMap()
	communications //TODO Communications DTO

	@AutoMap()
	contactPerson: string

	@AutoMap()
	description: string

	@AutoMap()
	properties //TODO Tag DTO

	@AutoMap()
	attributes //TODO Tag DTO

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
}
