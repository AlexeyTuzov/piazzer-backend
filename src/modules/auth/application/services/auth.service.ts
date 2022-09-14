import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/application/services/users.service';
import CredentialsDto from '../DTO/credentials.dto';
import ResendCodeDto from '../DTO/resendCode.dto';
import SignUpConfirmDto from '../DTO/signUpConfirm.dto';
import RefreshTokenDto from '../DTO/refreshToken.dto';
import OAuthDto from '../DTO/oAuth.dto';
import UserTypes from 'src/modules/users/domain/enums/user-types';
import SignUpDto from '../DTO/signUp.dto';
import InternalServerError from 'src/infrastructure/exceptions/internal-server-error';
import CryptoService from '../../infrastructure/crypto.service';
import { DataSource } from 'typeorm';
import AuthTokensDto from '../DTO/authTokens.dto';
import AuthTokensGenerator from '../../infrastructure/authTokens.generator';

@Injectable()
export class AuthService {

    constructor(
        private authTokensGenerator: AuthTokensGenerator,
        private usersService: UsersService,
        private cryptoService: CryptoService,
        private dataSource: DataSource) { }

    async signUp(dto: SignUpDto, userType: UserTypes): Promise<string> {
        try {
            return this.dataSource.transaction(async () => {
                const existingUser = await this.usersService.getOneByEmail(dto.email);

                if (existingUser) {
                    throw new HttpException(
                        'User with this email already exists!',
                        HttpStatus.BAD_REQUEST);
                }

                const encryptedPassword = await this.cryptoService.encrypt(dto.password);
                const userId = await this.usersService.create(
                    {
                        ...dto,
                        password: encryptedPassword
                    });
                //TODO: что за secret отсюда надо вернуть???
                return userId;
            });

        } catch (err) {
            throw new InternalServerError('User sign up has been failed');
        }
    }

    async signUpResendCode(dto: ResendCodeDto) {

    }

    async signUpConfirm(dto: SignUpConfirmDto) {

    }

    async signIn(dto: CredentialsDto): Promise<AuthTokensDto> {
        try {
            return this.dataSource.transaction(async () => {
                const foundUser = await this.usersService.getOneByEmail(dto.email);

                if (!foundUser) {
                    throw new HttpException('No user with this email found! Try to sign up first!', HttpStatus.BAD_REQUEST);
                }

                const passwordMatch: boolean = await this.cryptoService.compare(dto.password, foundUser.password);

                if (!passwordMatch) {
                    throw new HttpException('Password mismatch!', HttpStatus.BAD_REQUEST);
                }

                const tokens = this.authTokensGenerator.generate(foundUser.id);
                return tokens;
            });
        } catch (err) {
            throw new InternalServerError('User sign up has been failed');
        }

    }

    async refreshToken(dto: RefreshTokenDto) {

    }

    async oAuth(dto: OAuthDto) {

    }
}
