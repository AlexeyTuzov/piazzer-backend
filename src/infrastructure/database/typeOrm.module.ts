import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',

				host: config.get<string>('DB_HOST'),
				port: Number(config.get<number>('DB_PORT')),

				username: config.get<string>('DB_USER'),
				password: config.get<string>('DB_PASS'),
				database: config.get<string>('DB_NAME'),

				synchronize: config.get<string>('DB_SYNC') !== 'false',
				logging: config.get<string>('DB_DEBUG') !== 'false',

				autoLoadEntities: true,
			}),
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
