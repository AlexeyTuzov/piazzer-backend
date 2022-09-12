import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import createUserDto from 'src/modules/users/application/DTO/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/modules/users/application/services/users.service';
import CredentialsDto from '../DTO/credentials.dto';
import ResendCodeDto from '../DTO/resendCode.dto';
import SignUpConfirmDto from '../DTO/signUpConfirm.dto';
import RefreshTokenDto from '../DTO/refreshToken.dto';
import OAuthDto from '../DTO/oAuth.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        private userService: UsersService) {
    }

    async signUp(dto: CredentialsDto) {

    }

    async signUpResendCode(dto: ResendCodeDto) {

    }

    async signUpConfirm(dto: SignUpConfirmDto) {

    }

    async signIn(dto: CredentialsDto) {

        const foundUser = await this.userService.getOne(dto);
        if (!foundUser) {
            throw new HttpException('No user with this email found! Try to sign up first!', HttpStatus.BAD_REQUEST);
        }

        const passwordMatch: boolean = await bcrypt.compare(dto.password, foundUser.password);
        if (!passwordMatch) {
            throw new HttpException('Password mismatch!', HttpStatus.BAD_REQUEST);
        }
        const payload = { email: dto.email };
        const token: string = this.jwtService.sign(payload);
        return token;
    }

    async refreshToken(dto: RefreshTokenDto) {

    }

    async oAuth(dto: OAuthDto) {
        
    }
}
