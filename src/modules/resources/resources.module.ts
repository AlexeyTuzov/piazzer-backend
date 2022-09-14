import { Module } from '@nestjs/common';
import { ResourcesService } from './application/services/resources.service';
import { ResourcesController } from './controllers/resources.controller';
import ResizeService from './infrastructure/resize.service';
import YandexCloudService from './infrastructure/yandexCloud.service';

@Module({
    providers: [ResourcesService, YandexCloudService, ResizeService],
    controllers: [ResourcesController]
})
export class ResourcesModule { };
