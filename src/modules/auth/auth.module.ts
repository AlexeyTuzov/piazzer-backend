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
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
