import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsString,
	IsUUID,
} from 'class-validator'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'

export class CreateEventDto {
	@IsBoolean()
	isDraft: boolean

	@IsString()
	@IsNotEmpty()
	title: string

	@IsUUID()
	coverId: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsArray()
	communications: Communication[]

	@IsUUID('4', { each: true })
	@IsArray()
	resourcesIds: string[]
}
