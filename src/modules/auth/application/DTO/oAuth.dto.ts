import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export default class OAuthDto {
	@IsString()
	@IsNotEmpty()
	type: string

	@IsString()
	@IsNotEmpty()
	token: string

	@IsObject()
	meta: Record<string, unknown>
}
