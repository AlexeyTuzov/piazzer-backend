import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './Users/users.module';
import { CommunicationsModule } from './Communications/communications.module';
import { Communication } from './Communications/Communications.entity';

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

