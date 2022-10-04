import { CommentEntityTypesEnum } from '../../domain/enums/commentEntityTypes.enum'
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'

export class CommentsUpdateDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	content: string

	@IsOptional()
	@IsEnum(CommentEntityTypesEnum)
	entityType: CommentEntityTypesEnum

	@IsOptional()
	@IsUUID()
	entityId: string

	@IsOptional()
	@IsUUID()
	parentId: string

	@IsOptional()
	@IsUUID('4', { each: true })
	@IsArray()
	attachmentsIds: string[]
}
