import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/users.entity';
import { AuthModule } from '../auth/auth.module';
import { Communication } from './domain/entities/communications.entity';

@Module({
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User, Communication]),
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }