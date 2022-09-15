import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionBoot } from './infrastructure/exceptions/exception.boot';

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`);
    });
    exceptionBoot(app);
}

bootstrap();
