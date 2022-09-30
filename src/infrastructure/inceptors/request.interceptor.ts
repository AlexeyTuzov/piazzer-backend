import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
	constructor(private readonly logger: LoggerService) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const now = Date.now()
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		const ip = this.getIP(request)

		this.logger.log(
			`Incoming Request on ${request.path}`,
			`method=${request.method} ip=${ip}`,
		)

		return next.handle().pipe(
			tap(() => {
				this.logger.log(
					`End Request for ${request.path}`,
					`method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
				)
			}),
		)
	}

	private getIP(request: any) {
		let ip: string
		const ipAddr = request.header['x-forwarded-for']

		if (ipAddr) {
			const list = ipAddr.split()
			ip = list[list.length - 1]
		} else {
			ip = request.connection.remoteAddress
		}

		return ip.replace('::ffff:', '')
	}
}
