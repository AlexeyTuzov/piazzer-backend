import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from 'src/modules/users/users.module'
import { AccessControlService } from './service/access-control.service'

@Module({
	providers: [AccessControlService],
	imports: [forwardRef(() => UsersModule)],
	exports: [AccessControlService],
})
export class AccessControlModule {}
