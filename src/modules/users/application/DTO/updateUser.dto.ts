import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	position: string
}
