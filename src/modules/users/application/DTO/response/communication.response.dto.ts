import { AutoMap } from '@automapper/classes'

export class CommunicationResponseDto {
	@AutoMap()
	id: string

	@AutoMap()
	type: string

	@AutoMap()
	value: string

	@AutoMap()
	description: string

	@AutoMap()
	confirmed: boolean

	@AutoMap()
	createdAt: Date

	@AutoMap()
	updatedAt: Date
}
