import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => {
            UsersModule

        }),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
            }
        })
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
