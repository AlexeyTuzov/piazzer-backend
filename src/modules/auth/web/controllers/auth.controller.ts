import { Body, Controller, Logger, Post } from '@nestjs/common';
import ResendCodeDto from '../../application/DTO/resendCode.dto';
import SignUpDto from '../../application/DTO/signUp.dto';
import SignUpConfirmDto from '../../application/DTO/signUpConfirm.dto';
import { AuthService } from '../../application/services/auth.service';
import CredentialsDto from '../../application/DTO/credentials.dto';
import RefreshTokenDto from '../../application/DTO/refreshToken.dto';
import OAuthDto from '../../application/DTO/oAuth.dto';
import UserTypes from 'src/modules/users/domain/enums/user-types';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name)
    constructor(private authService: AuthService) { }
 
    @Post('/sign-up')
    signUpUser(@Body() dto: SignUpDto) {
        this.logger.debug('sign-up')
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
