import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class CredentialsDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string
}
