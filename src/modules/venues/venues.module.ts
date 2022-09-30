import { Module } from '@nestjs/common'
import { VenuesService } from './application/services/venues.service'
import { VenuesController } from './web/controllers/venues.controller'

@Module({
	controllers: [VenuesController],
	providers: [VenuesService],
	exports: [VenuesService],
})
export class VenuesModule {}
