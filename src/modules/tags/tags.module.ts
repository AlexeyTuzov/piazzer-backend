import { Module } from '@nestjs/common'
import { AccessControlModule } from 'src/infrastructure/accessControlModule/access-control.module'
import { TagProfile } from './application/mapper/tag.profile'
import { TagsService } from './application/services/tags.service'
import { TagsController } from './web/controllers/tags.controller'

@Module({
	controllers: [TagsController],
	providers: [TagsService, TagProfile],
	exports: [TagsService, TagProfile],
	imports: [AccessControlModule],
})
export class TagsModule {}
