import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string

	@IsNotEmpty()
	@IsString()
	name: string

	@IsArray()
	communications?: Communication[]
}
