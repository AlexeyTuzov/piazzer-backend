import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    logData(data: string): void {
        console.log(data);
        console.log('Data successfully logged!');
    }
}
