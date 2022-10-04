import { CommentEntityTypesEnum } from '../../domain/enums/commentEntityTypes.enum'
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator'

export class CommentsCreateUpdateDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsEnum(CommentEntityTypesEnum)
	entityType: CommentEntityTypesEnum

	@IsUUID()
	entityId: string

	@IsOptional()
	@IsUUID()
	parentId: string

	@IsUUID('4', { each: true })
	@IsArray()
	attachmentsIds: string[]
}
