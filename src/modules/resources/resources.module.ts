import { Module } from '@nestjs/common'
import { ResourcesService } from './application/services/resources.service'
import { ResourcesController } from './web/controllers/resources.controller'
import { YandexCloudService } from './application/services/yandexCloud.service'
import { ResourcesProfile } from './application/mapper/resources.profile'
import { ResizeService } from './application/services/resize.service'

@Module({
	controllers: [ResourcesController],
	providers: [
		ResourcesService,
		YandexCloudService,
		ResizeService,
		ResourcesProfile,
	],
	exports: [
		ResourcesService,
		YandexCloudService,
		ResizeService,
		ResourcesProfile,
	],
})
export class ResourcesModule {}
