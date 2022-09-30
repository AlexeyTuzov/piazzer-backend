import { Module } from '@nestjs/common'
import { ResourcesService } from './application/services/resources.service'
import { ResourcesController } from './web/controllers/resources.controller'
import { YandexCloudService } from './application/services/yandexCloud.service'

@Module({
	controllers: [ResourcesController],
	providers: [ResourcesService, YandexCloudService],
	exports: [ResourcesService, YandexCloudService],
})
export class ResourcesModule {}
