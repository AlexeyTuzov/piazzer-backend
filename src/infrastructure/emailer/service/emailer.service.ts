import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { IEmailService } from './emailer.interface'
import { IEmailSendOptions } from './emailer.options'

@Injectable()
export class EmailService implements IEmailService {
	constructor(readonly mailerService: MailerService) {}

	async send(emailSendOptions: IEmailSendOptions): Promise<boolean> {
		try {
			await this.mailerService.sendMail(emailSendOptions)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}
}
