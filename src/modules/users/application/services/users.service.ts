import { Injectable } from '@nestjs/common';
import CreateCommDto from 'src/modules/users/application/DTO/createCommDto';
import FilterUserDto from '../../infrastructure/DTO/filterUser.dto';
import ChangeRoleDto from '../DTO/changeRole.dto';
import CreateUserDto from '../DTO/createUser.dto';
import ConfirmUserCommDto from '../DTO/confirmUserComm.dto';
import CredentialsDto from 'src/modules/auth/application/DTO/credentials.dto';
import UpdateUserDto from '../DTO/updateUser.dto';
import InternalServerError from '../../../../infrastructure/exceptions/internal-server-error';
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
        try {
            return this.dataSource.transaction(async () => {
                const user = User.create();
                Object.assign(user, dto);
                await user.save();
                return user.id;
            });
        } catch (err) {
            throw new InternalServerError('User creation has been failed');
        }
    }

    async update(id: string, dto: UpdateUserDto): Promise<void> {
        try {
            return this.dataSource.transaction(async () => {
                const user = await User.findOne({ where: { id } });

                if (!user) {
                    throw new NotFoundError('User not found');
                }

                await User.update(id, { ...dto });
                return;
            });
        } catch (err) {
            throw new InternalServerError('User update has been failed');
        }
    }

    async getById(id: string): Promise<User> {
        try {
            return this.dataSource.transaction(async () => {
                const user = await User.findOne({ where: { id } });

                if (!user) {
                    throw new NotFoundError('User not found');
                }

                return user;
            });
        } catch (err) {
            throw new InternalServerError('User search has been failed');
        }

    }

    async getOneByEmail(email: string): Promise<User> {
        try {
            return this.dataSource.transaction(async () => {
                const user = await User.findOne({ where: { email } });

                if (!user) {
                    throw new NotFoundError('User not found');
                }

                return user;
            });
        } catch (err) {
            throw new InternalServerError('User search has been failed');
        }

    }

    async getFiltered(dto: FilterUserDto): Promise<User[]> {
        try {
            return this.dataSource.transaction(async () => {
                //TODO pagination
                const users = await User.find();
                return users;
            });
        } catch (err) {
            throw new InternalServerError('Users search has been failed');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            return this.dataSource.transaction(async () => {
                const user = await User.findOne({ where: { id } });

                if (!user) {
                    throw new NotFoundError('User not found');
                }

                await user.softRemove();
                return;
            });
        } catch (err) {
            throw new InternalServerError('User deletion has been failed');
        }
    }

    async getAllUserComms(dto: FilterCommDto): Promise<Communication[]> {
        try {
            return this.dataSource.transaction(async () => {
                const userComms = await Communication.find({ where: { user: { id: dto.userId } } });
                return userComms;
            });
        } catch (err) {
            throw new InternalServerError('User communications search has been failed');
        }
    }

    async createComm(id: string, dto: CreateCommDto): Promise<string> {
        try {
            return this.dataSource.transaction(async () => {
                const comm = Communication.create();
                const user = await User.findOne({ where: { id } });
                Object.assign(comm, { ...dto, user });
                await comm.save();
                return comm.id;
            });
        } catch (err) {
            throw new InternalServerError('User communication creation has been failed');
        }
    }

    async deleteComm(id: string, commID: string) {
        try {
            return this.dataSource.transaction(async () => {
                const comm = await Communication.findOne({ where: { id: commID } });

                if (!comm) {
                    throw new NotFoundError('User communication not found');
                }

                await Communication.delete({ id: commID });
                return;
            });
        } catch (err) {
            throw new InternalServerError('User communication deletion has been failed');
        }
    }

    //TODO: following methods should be in another services (e-mailer/admin)
    async confirmComm(id: string, dto: ConfirmUserCommDto) {
        //here we gonna call the mailer service's method
    }

    async logIn(dto: CredentialsDto) {

    }

    async sendCode(id: string) {

    }

    async changeRole(id: string, dto: ChangeRoleDto) {

    }

    async block(id: string) {

    }

    async unblock(id: string) {

    }

}
