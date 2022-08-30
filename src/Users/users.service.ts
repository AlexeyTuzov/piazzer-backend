import { Injectable } from '@nestjs/common';
import UserUseCases from 'src/abstractions/UserUseCases';
import filterDto from 'src/utilites/Pagination/filter.dto';
import createUserDto from './DTO/create-user.dto';
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

    async getOne(dto: searchUserDto) {

    }

    async getAll(dto: filterDto) {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }

    async logIn(dto: searchUserDto) {
        
    }

    async signUp(dto: searchUserDto) {
        
    }
}
