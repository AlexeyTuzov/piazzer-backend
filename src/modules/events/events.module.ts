import { Module } from '@nestjs/common'
import { CommunicationsModule } from '../communications/communications.module'
import { ResourcesModule } from '../resources/resources.module'
import { EventsService } from './application/services/events.service'
import { EventsController } from './web/controllers/events.controller'
import { VenuesScheduleProfile } from './application/mapper/event.profile'

@Module({
	controllers: [EventsController],
	providers: [EventsService, VenuesScheduleProfile],
	exports: [EventsService, VenuesScheduleProfile],
	imports: [ResourcesModule, CommunicationsModule],
})
export class EventsModule {}
