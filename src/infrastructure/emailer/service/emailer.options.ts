export interface IEmailSendOptions {
	to?: string | Array<string>
	cc?: string | Array<string>
	bcc?: string | Array<string>
	from?: string
	subject?: string
	context?: {
		[name: string]: any
	}
	template?: string
	text?: string
}
