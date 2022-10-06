import { Module } from '@nestjs/common'
import { CommunicationsModule } from '../communications/communications.module'
import { ResourcesModule } from '../resources/resources.module'
import { EventsService } from './application/services/events.service'
import { EventsController } from './web/controllers/events.controller'
import { VenuesScheduleProfile } from './application/mapper/event.profile'
import SchedulerService from 'src/infrastructure/scheduler/scheduler.service'

@Module({
	controllers: [EventsController],
	providers: [EventsService, VenuesScheduleProfile, SchedulerService],
	exports: [EventsService, VenuesScheduleProfile],
	imports: [ResourcesModule, CommunicationsModule],
})
export class EventsModule {}
