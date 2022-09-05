import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import InternalServerError from '../exceptions/internal-server-error';
import searchUserDto from './DTO/search-user.dto';
import NoContentResponse from '../exceptions/no-content-response';

@Injectable()
export default class UsersRepositoryService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async create(dto: createUserDto): Promise<string> {
        try {
            const newUser = this.usersRepository.create(dto);
            await this.usersRepository.save(newUser);
            return newUser.id;
        } catch (err) {
            throw new InternalServerError('User creation has been failed');
        }
    }

    async update(dto: updateUserDto): Promise<NoContentResponse> {
        try {
            await this.usersRepository.update(dto.id, { ...dto });
            return new NoContentResponse('User has been updated');
        } catch (err) {
            throw new InternalServerError('User update has been failed');
        }
    }

    async getById(id: string): Promise<User> {
        try {
            return await this.usersRepository.findOne({ where: { id } });
        } catch (err) {
            throw new InternalServerError('Users search has been failed');
        }

    }

    async getOne(dto: searchUserDto): Promise<User> {
        try {
            return await this.usersRepository.findOne({ where: { ...dto } });
        } catch (err) {
            throw new InternalServerError('Users search has been failed');
        }

    }

    async getAll(): Promise<User[]> {
        try {
            return await this.usersRepository.find();
            //TODO Pagination
        } catch (err) {
            throw new InternalServerError('Users search has been failed');
        }
    }

    async delete(id: string): Promise<NoContentResponse> {
        try {
            const userToBeDeleted = await this.usersRepository.findOne({ where: { id } });
            userToBeDeleted.deletedAt = new Date().toDateString();
            await this.usersRepository.save(userToBeDeleted);
            return new NoContentResponse('User has been deleted');
        } catch (err) {
            throw new InternalServerError('Users deletion has been failed');
        }
    }
}
