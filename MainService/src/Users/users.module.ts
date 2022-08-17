import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import UsersRepositoryService from './users-repository.service';

@Module({
  providers: [UsersService, UsersRepositoryService],
  controllers: [UsersController],
  imports: [
      TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule {}
