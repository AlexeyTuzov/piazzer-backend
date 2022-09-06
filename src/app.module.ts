import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/domain/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CommunicationsModule } from './modules/communications/communications.module';
import { Communication } from './modules/communications/domain/entities/Communications.entity';

//TODO: Use DatabaseModule instead TypeOrmModule, extract ConfigModule from here to an infrastructure module
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            username: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            entities: [User, Communication],
            autoLoadEntities: true
        }),
        UsersModule,
        CommunicationsModule
    ]
})
export class AppModule {}

