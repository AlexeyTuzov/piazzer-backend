import { Module } from '@nestjs/common';
import { EmailService } from './service/emailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

const EmailServiceProvider = {
    provide: 'IEmailService',
    useClass: EmailService,
};

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false,
                auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
            },
            defaults: {
                from: process.env.MAIL_USER,
            },
        }),
    ],
    providers: [EmailServiceProvider],
    exports: [EmailServiceProvider],
})
export class EmailerModule { }
