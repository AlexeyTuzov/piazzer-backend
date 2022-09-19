import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { IEmailService } from './emailer.interface';
import { IEmailSendOptions } from './emailer.options';

@Injectable()
export class EmailService implements IEmailService {
    constructor(readonly mailerService: MailerService) { }

    async send(emailSendOptions: IEmailSendOptions): Promise<boolean> {
        try {
            await this.mailerService.sendMail(emailSendOptions);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
