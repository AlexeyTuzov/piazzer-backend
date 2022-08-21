import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
    constructor(@Inject('LOGGER_SERVICE') private logger: ClientProxy) {
    }

    async logData(data: string) {
        return this.logger.emit('log', data);
    }
}
