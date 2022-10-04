import { Module } from '@nestjs/common'
import { CommentsService } from './application/services/comments.service'
import { CommentsController } from './web/controllers/comments.controller'
import { ResourcesModule } from '../resources/resources.module'
import { VenuesModule } from '../venues/venues.module'
import { CommentsProfile } from './application/mapper/comments.profile'

@Module({
	imports: [ResourcesModule, VenuesModule],
	controllers: [CommentsController],
	providers: [CommentsService, CommentsProfile],
	exports: [CommentsService, CommentsProfile],
})
export class CommentsModule {}
