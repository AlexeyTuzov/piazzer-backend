import { Injectable } from '@nestjs/common';
import CreateCommDto from 'src/modules/users/application/DTO/createCommDto';
import FilterUserDto from '../../infrastructure/DTO/filterUser.dto';
import ChangeRoleDto from '../DTO/changeRole.dto';
import CreateUserDto from '../DTO/createUser.dto';
import ConfirmUserCommDto from '../DTO/confirmUserComm.dto';
import UpdateUserDto from '../DTO/updateUser.dto';
import { User } from '../../domain/entities/users.entity';
import { Communication } from 'src/modules/users/domain/entities/communications.entity';
import { DataSource } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import FilterCommDto from '../../infrastructure/DTO/filterComm.dto';
import NotFoundError from 'src/infrastructure/exceptions/not-found';

@Injectable()
export class UsersService {

    constructor(
        private dataSource: DataSource,
        @InjectMapper() private mapper: Mapper) { }


    async create(dto: CreateUserDto): Promise<string> {
        return this.dataSource.transaction(async () => {
            const user = User.create();
            Object.assign(user, dto);
            await user.save();
            return user.id;
        });
    }

    async update(id: string, dto: UpdateUserDto): Promise<void> {
        return this.dataSource.transaction(async () => {
            const user = await User.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            await User.update(id, { ...dto });
            return;
        });
    }

    async getById(id: string): Promise<User> {
        return this.dataSource.transaction(async () => {
            const user = await User.findOne({ where: { id }, relations: ['communications'] });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            return user;
        });
    }

    async getOneByEmail(email: string): Promise<User> {
        return this.dataSource.transaction(async () => {
            const user = await User.findOne({ where: { email } });
            return user;
        });
    }

    async getFiltered(dto: FilterUserDto): Promise<User[]> {
        return this.dataSource.transaction(async () => {
            //TODO pagination
            const users = await User.find();
            return users;
        });
    }

    async delete(id: string): Promise<void> {
        return this.dataSource.transaction(async () => {
            const user = await User.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            await user.softRemove();
            return;
        });
    }

    async getAllUserComms(dto: FilterCommDto): Promise<Communication[]> {
        return this.dataSource.transaction(async () => {
            const userComms = await Communication.find({ where: { user: { id: dto.userId } } });
            return userComms;
        });
    }

    async createComm(id: string, dto: CreateCommDto): Promise<string> {
        return this.dataSource.transaction(async () => {
            const comm = Communication.create();
            const user = await User.findOne({ where: { id } });
            Object.assign(comm, { ...dto, user });
            await comm.save();
            return comm.id;
        });
    }

    async deleteComm(id: string, commID: string) {
        return this.dataSource.transaction(async () => {
            const comm = await Communication.findOne({ where: { id: commID } });

            if (!comm) {
                throw new NotFoundError('User communication not found');
            }

            await Communication.delete({ id: commID });
            return;
        });
    }

    //TODO: following methods should be in another services (e-mailer/admin)
    async confirmComm(id: string, commId: string, dto: ConfirmUserCommDto) {
        //here we gonna call the mailer service's method
    }

    async sendCode(id: string, commId: string) {

    }

    async changeRole(id: string, dto: ChangeRoleDto) {

    }

    async block(id: string) {

    }

    async unblock(id: string) {

    }

}
