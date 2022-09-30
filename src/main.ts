import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { exceptionBoot } from './infrastructure/exceptions/exception.boot'
import { validationBoot } from './infrastructure/validation/validation.boot'
import { RequestInterceptor } from './infrastructure/inceptors/request.interceptor'
import { LoggerService } from './infrastructure/logger/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	exceptionBoot(app)
	validationBoot(app)
	app.useGlobalInterceptors(new RequestInterceptor(new LoggerService()))
	await app.listen(3000)
}
bootstrap()
