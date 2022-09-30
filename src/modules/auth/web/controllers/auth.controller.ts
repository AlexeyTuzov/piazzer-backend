import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from '../../application/services/auth.service'
import SignUpDto from '../../application/dto/signUp.dto'
import ResendCodeDto from '../../application/dto/resendCode.dto'
import SignUpConfirmDto from '../../application/dto/signUpConfirm.dto'
import CredentialsDto from '../../application/dto/credentials.dto'
import RefreshTokenDto from '../../application/dto/refreshToken.dto'
import OAuthDto from '../../application/dto/oAuth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(200)
	@Post('/sign-up')
	async signUpUser(@Body() body: SignUpDto) {
		return await this.authService.signUp(body)
	}

	@HttpCode(200)
	@Post('/sign-up/resend-code')
	signUpResendCode(@Body() body: ResendCodeDto) {
		return this.authService.signUpResendCode(body)
	}

	@HttpCode(200)
	@Post('sign-up/confirm')
	signUpConfirm(@Body() body: SignUpConfirmDto) {
		return this.authService.signUpConfirm(body)
	}

	@HttpCode(200)
	@Post('/sign-in')
	signIn(@Body() body: CredentialsDto) {
		return this.authService.signIn(body)
	}

	@HttpCode(200)
	@Post('/refresh')
	authRefresh(@Body() body: RefreshTokenDto) {
		return this.authService.refreshToken(body)
	}

	@HttpCode(200)
	@Post('/o-auth')
	authOAuth(@Body() body: OAuthDto) {
		return this.authService.oAuth(body)
	}
}
