import { Module } from '@nestjs/common';
import { ResourcesModule } from '../resources/resources.module';
import { VenuesService } from './application/services/venues.service';
import { VenuesController } from './controllers/venues.controller';

@Module({
  providers: [VenuesService],
  controllers: [VenuesController],
  imports: [ResourcesModule]
})
export class VenuesModule {}
