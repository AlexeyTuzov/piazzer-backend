import { Module } from '@nestjs/common'
import { CommunicationsService } from './application/services/communications.service'

@Module({
	providers: [CommunicationsService],
	exports: [CommunicationsService],
})
export class CommunicationsModule {}
