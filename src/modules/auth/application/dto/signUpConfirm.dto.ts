import { IsString } from 'class-validator'

export default class SignUpConfirmDto {
	@IsString()
	secret: string

	@IsString()
	code: string
}
