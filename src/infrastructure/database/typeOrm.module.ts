import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from 'src/modules/comments/domain/entities/comments.entity'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'
import { Event } from 'src/modules/events/domain/entities/events.entity'
import { Resource } from 'src/modules/resources/domain/entities/resources.entity'
import { Tag } from 'src/modules/tags/domain/entities/tags.entity'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { Venue } from 'src/modules/venues/domain/entities/venues.entity'
import { VenueScheduleItem } from 'src/modules/venues/domain/entities/venueScheduleItem.entity'
import { CommunicationConfirm } from 'src/modules/verification-codes/domain/entities/communication-confirm.entity'
import { dataSourceOptions } from './data-source'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...dataSourceOptions,
		}),
		TypeOrmModule.forFeature([
			Comment,
			Communication,
			Event,
			Resource,
			Tag,
			User,
			Venue,
			VenueScheduleItem,
			CommunicationConfirm,
		]),
	],
})
export class TOrmModule {}
