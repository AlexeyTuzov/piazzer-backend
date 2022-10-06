import { Module } from '@nestjs/common'
import { TagProfile } from './application/mapper/tag.profile'
import { TagsService } from './application/services/tags.service'
import { TagsController } from './web/controllers/tags.controller'

@Module({
	controllers: [TagsController],
	providers: [TagsService, TagProfile],
	exports: [TagsService, TagProfile],
})
export class TagsModule {}
