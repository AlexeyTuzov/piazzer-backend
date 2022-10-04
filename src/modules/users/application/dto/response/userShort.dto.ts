import { AutoMap } from '@automapper/classes'

export class UserShortDto {
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
}
