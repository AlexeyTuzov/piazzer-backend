import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator'
import { CommunicationAddDto } from 'src/modules/communications/application/dto/communicationAdd.dto'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'

export default class UpdateEventDto {
	@IsOptional()
	@IsBoolean()
	@IsNotEmpty()
	isDraft: boolean

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@IsUUID()
	coverId: string

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string

	@IsOptional()
	@IsArray()
	@ValidateNested()
	@Type(() => CommunicationAddDto)
	communications: Communication[]

	@IsOptional()
	@IsUUID('4', { each: true })
	@IsArray()
	resourcesIds: string[]
}
