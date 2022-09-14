import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from './application/services/resources.service';
import { ResourcesController } from './controllers/resources.controller';
import { Resource } from './domain/entities/resources.entity';
import ResizeService from './infrastructure/resize.service';
import YandexCloudService from './infrastructure/yandexCloud.service';

@Module({
    providers: [ResourcesService, YandexCloudService, ResizeService],
    controllers: [ResourcesController],
    imports: [
        TypeOrmModule.forFeature([Resource])
    ],
    exports: [
        ResourcesService
    ]
})
export class ResourcesModule { };
