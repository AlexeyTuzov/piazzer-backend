import { IsString } from 'class-validator'

export default class AuthTokensDto {
	@IsString()
	accessToken: string

	@IsString()
	refreshToken: string
}
