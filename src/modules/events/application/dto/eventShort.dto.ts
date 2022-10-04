import { AutoMap } from '@automapper/classes'
import { UserShortDto } from '../../../users/application/dto/response/userShort.dto'

export class EventShortDto {
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
}
