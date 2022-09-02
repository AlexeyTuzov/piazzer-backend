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

    async getAll(dto: filterUserDto) {
        return await this.usersRepositoryService.getAll();
    }

    async delete(id: string) {

    }

    async logIn(dto: logInUserDto) {

    }

    async createComm(id: string, dto: createCommDto) {
        const newComm = await this.commService.create(dto);
        const user = await this.getById(id);
        user.Communications.push(newComm);
        //TODO: Check if user.Communications array are realy saved in DB
        return newComm.id;
    }

    async deleteComm(id: string, commID: string) {
        //TODO: Need to check if communication being deleted from user's model
        //if user ID is not needed - remove it from params as redundrant
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
