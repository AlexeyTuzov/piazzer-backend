import { IsNotEmpty, IsString } from 'class-validator'

export class CommunicationConfirmDto {
	@IsString()
	@IsNotEmpty()
	code: string
}
