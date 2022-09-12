import { Module } from '@nestjs/common';
import { VenuesService } from './application/services/venues.service';
import { VenuesController } from './controllers/venues.controller';

@Module({
  providers: [VenuesService],
  controllers: [VenuesController]
})
export class VenuesModule {}
