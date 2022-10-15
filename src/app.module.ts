import { Module, CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import * as redisStore from 'cache-manager-redis-store'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './infrastructure/emailer/emailer.module'
import { MapperModule } from './infrastructure/automapper/mapper.module'
import { ResourcesModule } from './modules/resources/resources.module'
import { TagsModule } from './modules/tags/tags.module'
import { VenuesModule } from './modules/venues/venues.module'
import { EventsModule } from './modules/events/events.module'
import { CommunicationsModule } from './modules/communications/communications.module'
import { CommentsModule } from './modules/comments/comments.module'
import { TOrmModule } from './infrastructure/database/typeOrm.module'
import { AccessControlModule } from './infrastructure/access-control/access-control.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST,
		}),
		TOrmModule,
		MapperModule,
		EmailModule,
		AuthModule,
		ResourcesModule,
		CommunicationsModule,
		TagsModule,
		VenuesModule,
		EventsModule,
		CommentsModule,
		AccessControlModule,
		UsersModule,
	],
})
export class AppModule {}
