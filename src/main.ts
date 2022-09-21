import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionBoot } from './infrastructure/exceptions/exception.boot';
import { validationBoot } from './infrastructure/validation/validation.boot';

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    exceptionBoot(app);
    validationBoot(app);
    await app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`);
    });
}

bootstrap();
