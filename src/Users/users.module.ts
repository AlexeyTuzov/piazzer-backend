import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import UsersRepositoryService from './users-repository.service';
import { CommunicationsModule } from 'src/Communications/communications.module';

@Module({
    providers: [
        UsersService,
        UsersRepositoryService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        CommunicationsModule
    ]
})
export class UsersModule { }
