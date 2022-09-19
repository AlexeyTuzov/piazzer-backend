import { Injectable } from '@nestjs/common';
import CreateCommDto from 'src/modules/communications/application/DTO/createCommDto';
import FilterUserDto from '../../infrastructure/DTO/filterUser.dto';
import ChangeRoleDto from '../DTO/changeRole.dto';
import CreateUserDto from '../DTO/createUser.dto';
import ConfirmUserCommDto from '../../../communications/application/DTO/confirmUserComm.dto';
import UpdateUserDto from '../DTO/updateUser.dto';
import { User } from '../../domain/entities/users.entity';
import FilterCommDto from '../../../communications/infrastructure/filterComm.dto';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { transacting } from 'src/infrastructure/database/transacting';
import { EntityManager } from 'typeorm';
import { CommunicationsService } from 'src/modules/communications/application/services/communications.service';
import { Communication } from 'src/modules/communications/domain/entities/communications.entity';
import CommunicationsTypes from 'src/modules/communications/domain/enums/comm-types';

@Injectable()
export class UsersService {

    constructor(private communicationsService: CommunicationsService) { }

    async create(dto: CreateUserDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const user = em.getRepository(User).create();
            const communications = [{type: CommunicationsTypes.EMAIL, value: dto.email}];
            Object.assign(user, {...dto, communications});
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

    async getAllUserComms(id: string, dto: FilterCommDto, em?: EntityManager): Promise<Communication[]> {
        return transacting(async (em) => {
            const user = await this.getById(id);
            return await this.communicationsService.getFiltered(user.id, dto, em);
        }, em);
    }

    async createComm(id: string, dto: CreateCommDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const user = await this.getById(id);
            return await this.communicationsService.create({ user, ...dto }, em);
        }, em);
    }

    async deleteComm(id: string, commID: string, em?: EntityManager) {
        return transacting(async (em) => {
            await this.getById(id);
            await this.communicationsService.delete(commID);
            return;
        }, em);
    }

    async confirmComm(id: string, commId: string, dto: ConfirmUserCommDto, em?: EntityManager) {
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
