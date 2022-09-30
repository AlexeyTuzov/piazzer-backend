import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
	catch(exception: EntityNotFoundError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()

		response
			.status(HttpStatus.NOT_FOUND)
			.json({ code: 'ENTITY_NOT_FOUND', status: HttpStatus.NOT_FOUND })
	}
}
