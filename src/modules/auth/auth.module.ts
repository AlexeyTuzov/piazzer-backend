import { Module } from '@nestjs/common'
import { AuthService } from './application/services/auth.service'
import { AuthController } from './web/controllers/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { CommunicationConfirmModule } from '../verification-codes/communication-confirm.module'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './web/strategies/jwt.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_PRIVATE_KEY'),
				signOptions: {
					expiresIn: '10m',
				},
			}),
		}),
		UsersModule,
		CommunicationConfirmModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
