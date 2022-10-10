import { Module } from '@nestjs/common'
import { ResourcesService } from './application/services/resources.service'
import { ResourcesController } from './web/controllers/resources.controller'
import { YandexCloudService } from './application/services/yandexCloud.service'
import { ResourcesProfile } from './application/mapper/resources.profile'
import { ResizeService } from './application/services/resize.service'
import { AccessControlModule } from 'src/infrastructure/accessControlModule/access-control.module'

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
	imports: [AccessControlModule],
})
export class ResourcesModule {}
