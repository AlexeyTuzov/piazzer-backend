import { Injectable } from '@nestjs/common';
import UserUseCases from 'src/abstractions/UserUseCases';
import filterDto from 'src/utilites/Pagination/DTO/filter.dto';
import createUserDto from './DTO/create-user.dto';
import logInUserDto from './DTO/login-user.dto';
import searchUserDto from './DTO/search-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';

@Injectable()
export class UsersService implements UserUseCases {

    constructor(private usersRepositoryService: UsersRepositoryService) {
    }

    async create(dto: createUserDto) {
        const newUserID = await this.usersRepositoryService.create(dto);
        return newUserID;
    }

    async update(dto: updateUserDto) {

    }

    async getById(id: string) {
        const foundUser = await this.usersRepositoryService.getById(id);
        return foundUser;
    }

    async getOne(dto: searchUserDto) {
        const foundUser = await this.usersRepositoryService.getOne(dto);
        return foundUser;
    }

    async getAll(dto: filterDto) {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }

    async logIn(dto: logInUserDto) {

    }

}
