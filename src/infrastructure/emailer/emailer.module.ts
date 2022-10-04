import { Global, Module } from '@nestjs/common'
import { EmailService } from './service/emailer.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				transport: {
					host: config.get<string>('MAIL_HOST'),
					port: config.get<number>('MAIL_PORT'),
					auth: {
						user: config.get<string>('MAIL_USER'),
						pass: config.get<string>('MAIL_PASS'),
					},
				},
				defaults: {
					from: config.get<string>('MAIL_USER'),
				},
			}),
		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
