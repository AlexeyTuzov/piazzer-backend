import { Module } from '@nestjs/common'
import { UsersService } from './application/services/users.service'
import { UsersController } from './web/controllers/users.controller'
import { UserProfile } from './application/mapper/profiles/user.profile'
import { CommunicationProfile } from './application/mapper/profiles/communication.profile'

@Module({
	controllers: [UsersController],
	providers: [UsersService, UserProfile, CommunicationProfile],
	exports: [UsersService],
})
export class UsersModule {}
