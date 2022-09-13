import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './controllers/auth.controller';
import AccessTokenGenerator from './infrastructure/accessToken.generator';
import AuthTokensGenerator from './infrastructure/authTokens.generator';
import CryptoService from './infrastructure/crypto.service';
import RefreshTokenGenerator from './infrastructure/refreshToken.generator';

@Module({
    providers: [
        AuthService,
        AccessTokenGenerator,
        RefreshTokenGenerator,
        AuthTokensGenerator,
        CryptoService,
        Number
    ],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
            }
        })
    ]
})
export class AuthModule { }