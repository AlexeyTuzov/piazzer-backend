import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class ResendCodeDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string
}
