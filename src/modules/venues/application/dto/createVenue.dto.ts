import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import CreateCoordinatesDto from './createCoordinates.dto'

export default class CreateVenueDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	address: string

	@IsOptional()
	@IsUUID()
	coverId: string

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	city: string

	@IsString()
	@IsNotEmpty()
	short: string

	@IsOptional()
	@IsObject()
	@ValidateNested({ each: true })
	coordinates: CreateCoordinatesDto

	@IsString()
	@IsNotEmpty()
	contactPerson: string

	@IsString()
	description: string

	@IsUUID('4', { each: true })
	propertiesIds: string

	@IsUUID('4', { each: true })
	attributesIds: string

	@IsOptional()
	@IsNumber()
	capacity: number

	@IsOptional()
	@IsNumber()
	cost: number

	@IsBoolean()
	isBlocked: boolean

	@IsBoolean()
	isDraft: boolean

	@IsUUID('4', { each: true })
	resourcesIds: string
}
