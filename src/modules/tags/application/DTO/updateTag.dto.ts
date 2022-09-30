import { IsOptional, IsString, IsUUID } from 'class-validator'
import { TagTypesEnum } from '../../domain/enums/tagTypes.enum'

export default class CreateTagDto {
	@IsString()
	label: string

	@IsOptional()
	@IsString()
	value: string

	@IsString()
	description: string

	@IsOptional()
	@IsUUID()
	avatarId: string

	@IsString()
	color: string

	@IsOptional()
	@IsString()
	type: TagTypesEnum
}
