import { Module } from '@nestjs/common'
import { CommentsService } from './application/services/comments.service'
import { CommentsController } from './web/controllers/comments.controller'

@Module({
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
