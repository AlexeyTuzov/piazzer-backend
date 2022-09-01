import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import UsersRepositoryService from './users-repository.service';
import CommunicationsRepositoryService from 'src/Communications/communications-repository.service';

@Module({
    providers: [
        UsersService,
        UsersRepositoryService,
        CommunicationsRepositoryService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User])
    ]
})
export class UsersModule { }
