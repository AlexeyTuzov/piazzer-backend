import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapperModule } from './infrastructure/automapper/mapper.module';
import { AuthModule } from './modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { VenuesModule } from './modules/venues/venues.module';

//TODO: extract ConfigModule from here to an infrastructure module
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        MapperModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            username: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            entities: [`${__dirname}/**/**.entity{.js,.ts}`],
            migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
            autoLoadEntities: true
        }),
        UsersModule,
        AuthModule,
        ResourcesModule,
        VenuesModule
    ]
})
export class AppModule { }

