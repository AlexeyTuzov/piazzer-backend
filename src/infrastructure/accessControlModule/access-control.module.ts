import { Module } from '@nestjs/common'
import { AccessControlService } from './service/access-control.service'

@Module({
	providers: [AccessControlService],
	exports: [AccessControlService],
})
export class AccessControlModule {}
