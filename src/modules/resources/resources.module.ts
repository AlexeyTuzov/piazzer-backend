import { Module } from '@nestjs/common';
import { ResourcesService } from './application/services/resources.service';
import { ResourcesController } from './controllers/resources.controller';

@Module({
    providers: [
        ResourcesService
    ],
    controllers: [
        ResourcesController
    ]
})
export class ResourcesModule { };
