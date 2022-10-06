import { AutoMap } from '@automapper/classes'
import { ResourcesResponseDto } from '../../../../resources/application/dto/response/resources.response.dto'
import { UserShortDto } from '../../../../users/application/dto/response/userShort.dto'

export class CommentsResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	content: string

	@AutoMap()
	entityType: string

	@AutoMap()
	entityId: string

	@AutoMap()
	parentId: string

	@AutoMap(() => ResourcesResponseDto)
	resources: ResourcesResponseDto

	@AutoMap(() => UserShortDto)
	creator: UserShortDto

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date
}
