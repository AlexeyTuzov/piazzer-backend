import { Module } from '@nestjs/common'
import { ResourcesService } from './application/services/resources.service'
import { ResourcesController } from './web/controllers/resources.controller'
import { YandexCloudService } from './application/services/yandexCloud.service'
import { ResourcesProfile } from './application/mapper/resources.profile'

@Module({
	controllers: [ResourcesController],
	providers: [ResourcesService, YandexCloudService, ResourcesProfile],
	exports: [ResourcesService, YandexCloudService, ResourcesProfile],
})
export class ResourcesModule {}
