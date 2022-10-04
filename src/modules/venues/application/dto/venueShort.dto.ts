import { AutoMap } from '@automapper/classes'
import { ResourcesResponseDto } from '../../../resources/application/dto/resources.response.dto'

export class VenueShortDto {
	@AutoMap()
	id: string

	@AutoMap()
	title: string

	@AutoMap()
	address: string

	@AutoMap()
	coverId: string

	@AutoMap(() => [ResourcesResponseDto])
	resources: ResourcesResponseDto[]

	@AutoMap()
	city: string

	@AutoMap()
	short: string

	@AutoMap(() => Date)
	createdAt: Date

	@AutoMap(() => Date)
	updatedAt: Date
}
