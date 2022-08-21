import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    providers: [LoggerService],
    imports: [
        ClientsModule.register([
            {
                name: 'LOGGER_SERVICE',
                transport: Transport.REDIS,
                options: {
                    host: 'redis',
                    port: 6379
                }
            }
        ])
    ],
    exports: [LoggerService]
})
export class LoggerModule {
}
