import { Module } from '@nestjs/common'
import { EventsService } from './application/services/events.service'
import { EventsController } from './web/controllers/events.controller'

@Module({
	controllers: [EventsController],
	providers: [EventsService],
	exports: [EventsService],
})
export class EventsModule {}
