import { Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/users.entity';

@Module({
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User])
    ]
})
export class UsersModule { }
