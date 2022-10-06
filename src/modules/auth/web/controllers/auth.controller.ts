import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../../application/services/auth.service'
import SignUpDto from '../../application/dto/signUp.dto'
import ResendCodeDto from '../../application/dto/resendCode.dto'
import SignUpConfirmDto from '../../application/dto/signUpConfirm.dto'
import CredentialsDto from '../../application/dto/credentials.dto'
import RefreshTokenDto from '../../application/dto/refreshToken.dto'
import { Roles } from 'src/infrastructure/decorators/roles.decorator'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/sign-up')
	async signUpUser(@Body() body: SignUpDto) {
		return await this.authService.signUp(body)
	}

	@Post('/sign-up/resend-code')
	signUpResendCode(@Body() body: ResendCodeDto) {
		return this.authService.signUpResendCode(body)
	}

	@Post('sign-up/confirm')
	signUpConfirm(@Body() body: SignUpConfirmDto) {
		return this.authService.signUpConfirm(body)
	}

	@Post('/sign-in')
	signIn(@Body() body: CredentialsDto) {
		return this.authService.signIn(body)
	}

	@Post('/refresh')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	authRefresh(@Body() body: RefreshTokenDto) {
		return this.authService.refreshToken(body)
	}

	// @Post('/o-auth')
	// authOAuth(@Body() body: OAuthDto) {
	// 	return this.authService.oAuth(body)
	// }
}
