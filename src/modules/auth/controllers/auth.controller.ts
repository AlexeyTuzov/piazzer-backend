import { Body, Controller, Post } from '@nestjs/common';
import ResendCodeDto from '../application/DTO/resendCode.dto';
import SignUpDto from '../application/DTO/credentials.dto';
import SignUpConfirmDto from '../application/DTO/signUpConfirm.dto';
import { AuthService } from '../application/services/auth.service';
import CredentialsDto from '../application/DTO/credentials.dto';
import RefreshTokenDto from '../application/DTO/refreshToken.dto';
import OAuthDto from '../application/DTO/oAuth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/sign-up')
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @Post('/sign-up/resend-code')
    signUpResendCode(@Body() dto: ResendCodeDto) {
        return this.authService.signUpResendCode(dto);
    }

    @Post('sign-up/confirm')
    signUpConfirm(@Body() dto: SignUpConfirmDto) {
        return this.authService.signUpConfirm(dto);
    }

    @Post('/sign-in')
    signIn(@Body() dto: CredentialsDto) {
        return this.authService.signIn(dto);
    }

    @Post('/refresh')
    authRefresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshToken(dto);
    }

    @Post('/o-auth')
    authOAuth(@Body() dto: OAuthDto) {
        return this.authService.oAuth(dto);
    }
}
