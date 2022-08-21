import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @EventPattern('log')
    logData (data: string ) {
        return this.appService.logData(data);
    }
}
