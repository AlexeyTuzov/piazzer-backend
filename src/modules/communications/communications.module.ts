import { Module } from '@nestjs/common'
import { CommunicationProfile } from './application/mapper/communication.profile'
import { CommunicationsService } from './application/services/communications.service'

@Module({
	providers: [CommunicationsService, CommunicationProfile],
	exports: [CommunicationsService, CommunicationProfile],
})
export class CommunicationsModule {}
