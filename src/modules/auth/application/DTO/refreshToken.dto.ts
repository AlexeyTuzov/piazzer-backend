import { IsString } from 'class-validator'

export default class RefreshTokenDto {
	@IsString()
	refreshToken: string
}
