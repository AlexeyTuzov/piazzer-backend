import { Module } from '@nestjs/common'
import { EventsService } from './application/services/events.service'
import { EventsController } from './web/controllers/events.controller'
import { VenuesScheduleProfile } from './application/mapper/event.profile'

@Module({
	controllers: [EventsController],
	providers: [EventsService, VenuesScheduleProfile],
	exports: [EventsService, VenuesScheduleProfile],
})
export class EventsModule {}
