import { Module } from '@nestjs/common'
import { VenuesService } from './application/services/venues.service'
import { VenuesController } from './web/controllers/venues.controller'
import { ResourcesModule } from '../resources/resources.module'
import { UsersModule } from '../users/users.module'
import { TagsModule } from '../tags/tags.module'
import { VenuesScheduleProfile } from './application/mapper/venuesSchedule.profile'
import { VenueProfile } from './application/mapper/venue.profile'
import { EventsModule } from '../events/events.module'

@Module({
	imports: [
		ResourcesModule,
		UsersModule,
		TagsModule,
		ResourcesModule,
		EventsModule,
	],
	controllers: [VenuesController],
	providers: [VenuesService, VenuesScheduleProfile, VenueProfile],
	exports: [VenuesService, VenuesScheduleProfile, VenueProfile],
})
export class VenuesModule {}
