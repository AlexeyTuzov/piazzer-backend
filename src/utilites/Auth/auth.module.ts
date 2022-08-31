import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/Users/users.module';
import { AuthService } from './auth.service';

@Module({
    providers: [AuthService],
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
