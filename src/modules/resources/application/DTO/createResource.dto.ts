import { IsEnum, IsString } from 'class-validator'
import { FileTypesEnum } from '../../domain/enums/fileTypes.enum'

export class CreateResourceDto {
	@IsString()
	name?: string

	@IsString()
	link?: string

	@IsString()
	size?: number

	@IsEnum(FileTypesEnum)
	type?: FileTypesEnum

	@IsString()
	mimeType?: string

	file?: Buffer
}
