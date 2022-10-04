import { AutoMap } from '@automapper/classes'

export class ResourcesResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	name: string

	@AutoMap()
	size: number

	@AutoMap()
	type: string

	@AutoMap()
	link: string

	@AutoMap()
	creatorId: string

	@AutoMap()
	mimeType: string

	@AutoMap(() => Date)
	updatedAt: Date

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	deletedAt: Date
}
