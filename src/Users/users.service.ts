import { Injectable } from '@nestjs/common';
import { UseCases } from '../abstractions/UseCases';
import createUserDto from './DTO/create-user.dto';
import searchUserDto from './DTO/search-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';

@Injectable()
export class UsersService implements UseCases {
    constructor(private usersRepositoryService: UsersRepositoryService) {
    }

    async create(dto: createUserDto) {
        const newUserID = await this.usersRepositoryService.create(dto);
        return newUserID;
    }

    async update(dto: updateUserDto) {

    }

    async getOne(dto: searchUserDto) {

    }

    async getAll() {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }
}
