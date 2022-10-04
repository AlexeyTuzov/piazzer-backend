import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CommunicationTypesEnum } from '../../domain/enums/communicationTypes.enum'

export class CommunicationAddDto {
	@IsEnum(CommunicationTypesEnum)
	type: CommunicationTypesEnum

	@IsString()
	@IsNotEmpty()
	value

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description
}
