import { Injectable } from '@nestjs/common';
import CreateCommDto from 'src/modules/users/application/DTO/createCommDto';
import FilterUserDto from '../../infrastructure/DTO/filterUser.dto';
import ChangeRoleDto from '../DTO/changeRole.dto';
import CreateUserDto from '../DTO/createUser.dto';
import ConfirmUserCommDto from '../DTO/confirmUserComm.dto';
import UpdateUserDto from '../DTO/updateUser.dto';
import { User } from '../../domain/entities/users.entity';
import { Communication } from 'src/modules/users/domain/entities/communications.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import FilterCommDto from '../../infrastructure/DTO/filterComm.dto';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { transacting } from 'src/infrastructure/database/transacting';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectMapper() private mapper: Mapper) { }


    async create(dto: CreateUserDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const user = em.getRepository(User).create();
            Object.assign(user, dto);
            await em.save(user);
            return user.id;
        }, em);
    }

    async update(id: string, dto: UpdateUserDto, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            const user = await em.getRepository(User).findOne({ where: { id } });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            await em.getRepository(User).update(id, { ...dto });
            return;
        }, em);
    }

    async getById(id: string, em?: EntityManager): Promise<User> {
        return transacting(async (em) => {
            const user = await em.getRepository(User).findOne({ where: { id }, relations: ['communications'] });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            return user;
        }, em);
    }

    async getOneByEmail(email: string, em?: EntityManager): Promise<User> {
        return transacting(async (em) => {
            const user = await em.getRepository(User).findOne({ where: { email } });
            return user;
        }, em);
    }

    async getFiltered(dto: FilterUserDto, em?: EntityManager): Promise<User[]> {
        return transacting(async (em) => {
            //TODO pagination
            const users = await em.getRepository(User).find();
            return users;
        }, em);
    }

    async delete(id: string, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            const user = await em.getRepository(User).findOne({ where: { id } });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            await em.softRemove(user);
            return;
        }, em);
    }

    async getAllUserComms(dto: FilterCommDto, em?: EntityManager): Promise<Communication[]> {
        return transacting(async (em) => {
            const userComms = await em.getRepository(Communication).find({ where: { user: { id: dto.userId } } });
            return userComms;
        }, em);
    }

    async createComm(id: string, dto: CreateCommDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const comm = em.getRepository(Communication).create();
            const user = await em.getRepository(User).findOne({ where: { id } });
            Object.assign(comm, { ...dto, user });
            await em.save(comm);
            return comm.id;
        }, em);
    }

    async deleteComm(id: string, commID: string, em?: EntityManager) {
        return transacting(async (em) => {
            const comm = await em.getRepository(Communication).findOne({ where: { id: commID } });

            if (!comm) {
                throw new NotFoundError('User communication not found');
            }

            await em.delete(Communication, { id });
            return;
        }, em);
    }

    //TODO: following methods should be in another services (e-mailer/admin)
    async confirmComm( id: string, commId: string, dto: ConfirmUserCommDto, em?: EntityManager) {
        //here we gonna call the mailer service's method
    }

    async sendCode(id: string, commId: string, em?: EntityManager) {

    }

    async changeRole(id: string, dto: ChangeRoleDto, em?: EntityManager) {

    }

    async block(id: string, em?: EntityManager) {

    }

    async unblock(id: string, em?: EntityManager) {

    }

}
