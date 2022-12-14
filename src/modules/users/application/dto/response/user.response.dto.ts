import { AutoMap } from '@automapper/classes'
import { CommunicationResponseDto } from '../../../../communications/application/dto/response/communication.response.dto'

export class UserResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	role: string

	@AutoMap()
	name: string

	@AutoMap()
	verified: boolean

	@AutoMap()
	blocked: boolean

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date

	@AutoMap(() => [CommunicationResponseDto])
	communications: CommunicationResponseDto[]
}
