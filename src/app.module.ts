import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { MapperModule } from './infrastructure/automapper/mapper.module';
import { AuthModule } from './modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { VenuesModule } from './modules/venues/venues.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EventsModule } from './modules/events/events.module';
import { CommunicationsModule } from './modules/communications/communications.module';
import { EmailerModule } from './infrastructure/emailer/emailer.module';

//TODO: extract ConfigModule from here to an infrastructure module
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        MapperModule,
        DatabaseModule,
        UsersModule,
        AuthModule,
        ResourcesModule,
        VenuesModule,
        EventsModule,
        CommunicationsModule,
        EmailerModule
    ]
})
export class AppModule { }

