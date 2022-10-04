import { Module, CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TypeOrmModule } from '@nestjs/typeorm'
import * as redisStore from 'cache-manager-redis-store'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './infrastructure/emailer/emailer.module'
import { Communication } from './modules/communications/domain/entities/communications.entity'
import { Comment } from './modules/comments/domain/entities/comments.entity'
import { Event } from './modules/events/domain/entities/events.entity'
import { Resource } from './modules/resources/domain/entities/resources.entity'
import { Tag } from './modules/tags/domain/entities/tags.entity'
import { User } from './modules/users/domain/entities/users.entity'
import { Venue } from './modules/venues/domain/entities/venues.entity'
import { CommunicationConfirm } from './modules/verification-codes/domain/entities/communication-confirm.entity'
import { VenueScheduleItem } from './modules/venues/domain/entities/venueScheduleItem.entity'
import { MapperModule } from './infrastructure/automapper/mapper.module'
import { ResourcesModule } from './modules/resources/resources.module'
import { TagsModule } from './modules/tags/tags.module'
import { VenuesModule } from './modules/venues/venues.module'
import { EventsModule } from './modules/events/events.module'
import { CommunicationsModule } from './modules/communications/communications.module'
import { CommentsModule } from './modules/comments/comments.module'

@Module({
	imports: [
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
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',

			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),

			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,

			synchronize: process.env.DB_SYNC !== 'false',
			logging: process.env.DB_DEBUG !== 'false',

			autoLoadEntities: true,
		}),
		MapperModule,
		EmailModule,
		AuthModule,
		ResourcesModule,
		CommunicationsModule,
		TagsModule,
		VenuesModule,
		EventsModule,
		CommentsModule,
	],
})
export class AppModule {}
