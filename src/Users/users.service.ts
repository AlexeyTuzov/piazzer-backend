import { Injectable } from '@nestjs/common';
import UserUseCases from 'src/abstractions/UserUseCases';
import { CommunicationsService } from 'src/Communications/communications.service';
import createCommDto from 'src/Communications/DTO/create-comm.dto';
import filterUserDto from 'src/utilites/Pagination/DTO/filter-user.dto';
import changeRoleDto from './DTO/change-role.dto';
import confirmUserCommDto from './DTO/confirm-user-comm.dto';
import createUserDto from './DTO/create-user.dto';
import logInUserDto from './DTO/login-user.dto';
import searchUserDto from './DTO/search-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';

@Injectable()
export class UsersService implements UserUseCases {

    constructor(private usersRepositoryService: UsersRepositoryService,
        private commService: CommunicationsService) {
    }

    async create(dto: createUserDto) {
        return await this.usersRepositoryService.create(dto);
    }

    async update(dto: updateUserDto) {
        return await this.usersRepositoryService.update(dto);
    }

    async getById(id: string) {
        return await this.usersRepositoryService.getById(id);
    }

    async getOne(dto: searchUserDto) {
        return await this.usersRepositoryService.getOne(dto);
    }

    async getAll(dto: filterUserDto) {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {
        return await this.usersRepositoryService.delete(id);
    }

    async logIn(dto: logInUserDto) {

    }

    async createComm(id: string, dto: createCommDto) {
        const newComm = await this.commService.create(dto);
        const user = await this.usersRepositoryService.getById(id);
        user.Communications.push(newComm);
        //TODO: Check if user.Communications array are really saved in DB
        return newComm.id;
    }

    async deleteComm(id: string, commID: string) {
        //TODO: Need to check if communication being deleted from user's model
        //if user ID is not needed - remove it from params as redundant
        return this.commService.delete(commID);
    }

    async confirmComm(id: string, dto: confirmUserCommDto) {
        //here we gonna call the mailer service's method
    }

    async sendCode(id: string) {

    }

    async changeRole(id: string, dto: changeRoleDto) {

    }

    async block(id: string) {

    }

    async unblock(id: string) {

    }

}
