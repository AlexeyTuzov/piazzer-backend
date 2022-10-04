import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
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

	//TODO IsNotEmpty
	@IsString()
	short: string

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => CreateCoordinatesDto)
	coordinates: CreateCoordinatesDto

	@IsString()
	@IsNotEmpty()
	contactPerson: string

	@IsString()
	description: string

	@IsUUID('4', { each: true })
	@IsArray()
	propertiesIds: string[]

	@IsUUID('4', { each: true })
	@IsArray()
	attributesIds: string[]

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
	@IsArray()
	resourcesIds: string[]
}
