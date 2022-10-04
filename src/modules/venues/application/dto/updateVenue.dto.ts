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
import CreateCoordinatesDto from './createCoordinates.dto'
import { Type } from 'class-transformer'

export default class UpdateVenueDto {
	@IsOptional()
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

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	short: string

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => CreateCoordinatesDto)
	coordinates: CreateCoordinatesDto

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	contactPerson: string

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsUUID('4', { each: true })
	@IsArray()
	propertiesIds: string[]

	@IsOptional()
	@IsUUID('4', { each: true })
	@IsArray()
	attributesIds: string[]

	@IsOptional()
	@IsNumber()
	capacity: number

	@IsOptional()
	@IsNumber()
	cost: number

	@IsOptional()
	@IsBoolean()
	isBlocked: boolean

	@IsOptional()
	@IsBoolean()
	isDraft: boolean

	@IsOptional()
	@IsUUID('4', { each: true })
	@IsArray()
	resourcesIds: string[]
}
