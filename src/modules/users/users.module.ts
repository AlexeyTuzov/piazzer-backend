import { Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/users.entity';
import { CommunicationsModule } from 'src/modules/communications/communications.module';

@Module({
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        CommunicationsModule
    ]
})
export class UsersModule { }
