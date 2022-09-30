import { IEmailSendOptions } from './emailer.options'

export interface IEmailService {
	send(emailSendOptions: IEmailSendOptions): Promise<boolean>
}
