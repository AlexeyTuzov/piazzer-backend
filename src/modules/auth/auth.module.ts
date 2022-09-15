import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './web/controllers/auth.controller';
import AccessTokenGenerator from './infrastructure/tokenGenerators/accessToken.generator';
import AuthTokensGenerator from './infrastructure/tokenGenerators/authTokens.generator';
import CryptoService from './infrastructure/crypto.service';
import RefreshTokenGenerator from './infrastructure/tokenGenerators/refreshToken.generator';
import JwtDecoder from './infrastructure/jwtDecoder';

@Module({
    providers: [
        AuthService,
        AccessTokenGenerator,
        RefreshTokenGenerator,
        AuthTokensGenerator,
        CryptoService,
        JwtDecoder
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
    ],
    exports: [JwtDecoder]
})
export class AuthModule { }