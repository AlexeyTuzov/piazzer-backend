import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './application/services/users.service'
import { UsersController } from './web/controllers/users.controller'
import { UserProfile } from './application/mapper/profiles/user.profile'
import { CommunicationProfile } from '../communications/application/mapper/communication.profile'
import { AccessControlModule } from 'src/infrastructure/accessControlModule/access-control.module'

@Module({
	controllers: [UsersController],
	providers: [UsersService, UserProfile, CommunicationProfile],
	imports: [forwardRef(() => AccessControlModule)],
	exports: [UsersService],
})
export class UsersModule {}
