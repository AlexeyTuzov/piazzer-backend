import { Module } from '@nestjs/common'
import { TagsService } from './application/services/tags.service'
import { TagsController } from './web/controllers/tags.controller'

@Module({
	controllers: [TagsController],
	providers: [TagsService],
	exports: [TagsService],
})
export class TagsModule {}
