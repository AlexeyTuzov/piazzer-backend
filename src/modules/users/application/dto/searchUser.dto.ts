import { IsEmail, IsString } from 'class-validator'

export default class SearchUserDto {
	@IsEmail()
	@IsString()
	email?: string

	@IsString()
	name?: string
}
