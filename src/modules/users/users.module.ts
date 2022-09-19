import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { CommunicationsModule } from '../communications/communications.module';

@Module({
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        CommunicationsModule
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }