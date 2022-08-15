import { Injectable } from '@nestjs/common';
import { UseCases } from '../abstractions/UseCases';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';

@Injectable()
export class UsersService implements UseCases {
    constructor(private usersRepositoryService: UsersRepositoryService) {
    }

    async create(dto: createUserDto) {
        return await this.usersRepositoryService.create(dto);
    }

    async update(dto: updateUserDto) {

    }

    async getById(id: string) {

    }

    async getAll() {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }
}
