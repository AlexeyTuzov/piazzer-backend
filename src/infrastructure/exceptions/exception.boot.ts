import { INestApplication } from '@nestjs/common'
import { AllExceptionsFilter } from './filters/allExceptions.filter'
import { HttpExceptionFilter } from './filters/httpException.filter'
import { NotFoundExceptionFilter } from './filters/notFoundException.filter'
import { UnauthorizedExceptionFilter } from './filters/unauthorizedException.filter'
import { ForbiddenExceptionFilter } from './filters/forbiddenException.filter'

export function exceptionBoot(app: INestApplication) {
	app.useGlobalFilters(
		new AllExceptionsFilter(),
		new HttpExceptionFilter(),
		new NotFoundExceptionFilter(),
		new UnauthorizedExceptionFilter(),
		new ForbiddenExceptionFilter(),
	)
}
