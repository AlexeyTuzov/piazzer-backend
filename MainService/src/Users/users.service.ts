import { Injectable } from '@nestjs/common';
import { UseCases } from '../abstractions/UseCases';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService implements UseCases {
    constructor(private usersRepositoryService: UsersRepositoryService,
                private loggerService: LoggerService) {
    }

    async create(dto: createUserDto) {
        const newUserID = await this.usersRepositoryService.create(dto);
        await this.loggerService.logData(newUserID);
        return newUserID;
    }

    async update(dto: updateUserDto) {

    }

    async getById(id: string) {

    }

    async getAll() {
        await this.loggerService.logData('Users fetched from DB');
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }
}
