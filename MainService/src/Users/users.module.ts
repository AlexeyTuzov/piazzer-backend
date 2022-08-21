import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import UsersRepositoryService from './users-repository.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
    providers: [UsersService, UsersRepositoryService],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        LoggerModule
    ]
})
export class UsersModule { }
