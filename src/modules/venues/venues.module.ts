import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ResourcesModule } from '../resources/resources.module';
import { UsersModule } from '../users/users.module';
import { VenuesService } from './application/services/venues.service';
import { VenuesController } from './controllers/venues.controller';
import { Venue } from './domain/entities/venues.entity';

@Module({
  providers: [VenuesService],
  controllers: [VenuesController],
  imports: [
    ResourcesModule,
    TypeOrmModule.forFeature([Venue]),
    AuthModule,
    UsersModule
]
})
export class VenuesModule {}
