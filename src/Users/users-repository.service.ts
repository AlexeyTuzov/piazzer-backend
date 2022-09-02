import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import InternalServerError from '../exceptions/internal-server-error';
import searchUserDto from './DTO/search-user.dto';

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

    async update(dto: updateUserDto) {
        await this.usersRepository.update(dto.id, {...dto});
    }

    async getById(id: string): Promise<User> {

        const foundUser = await this.usersRepository.findOne({where: {id}});
        return foundUser;
    }

    async getOne(dto: searchUserDto): Promise<User> {

        const foundUser = await this.usersRepository.findOne({where: {...dto}});
        return foundUser;
    }

    async getAll(): Promise<User[]> {

        try {
            return await this.usersRepository.find();
            //TODO Pagination
        } catch (err) {
            throw new InternalServerError('Users search has been failed');
        }
    }

    async delete(id: string) {

    }
}
