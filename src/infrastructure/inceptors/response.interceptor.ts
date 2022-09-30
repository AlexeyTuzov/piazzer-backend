import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { isArray } from 'class-validator'

export class ResponseFormat<T> {
	isArray: boolean
	path: string
	duration: string
	method: string
	data: T
}

@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T, ResponseFormat<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>,
	): Observable<ResponseFormat<T>> | Promise<Observable<ResponseFormat<T>>> {
		const now = Date.now()
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		return next.handle().pipe(
			map((data) => ({
				data,
				isArray: isArray(data),
				path: request.path,
				duration: `${Date.now() - now}ms`,
				method: request.method,
			})),
		)
	}
}
