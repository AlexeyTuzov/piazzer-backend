import { IsArray, IsNumber, IsString } from 'class-validator'
import { Communication } from 'src/modules/users/domain/entities/communications.entity'
import CreateCoordinatesDto from './createCoordinates.dto'

export default class UpdateVenueDto {
	@IsString()
	title?: string

	@IsString()
	address?: string

	@IsString()
	coverId?: string

	@IsString()
	city?: string

	@IsString()
	contactPerson?: string

	@IsString()
	short?: string

	@IsString()
	coordinates?: CreateCoordinatesDto

	communications?: Communication[]

	@IsString()
	description?: string

	@IsArray()
	propertiesIds?: string[]

	@IsArray()
	attributesIds?: string[]

	@IsNumber()
	capacity?: number

	@IsNumber()
	cost?: number

	@IsArray()
	resourcesIds?: string[]
}
