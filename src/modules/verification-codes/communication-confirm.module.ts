import { Module } from '@nestjs/common'
import { CommunicationConfirmService } from './application/services/communication-confirm.service'

@Module({
	providers: [CommunicationConfirmService],
	exports: [CommunicationConfirmService],
})
export class CommunicationConfirmModule {}
