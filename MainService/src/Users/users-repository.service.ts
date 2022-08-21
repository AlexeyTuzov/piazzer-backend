import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import InternalServerError from '../exceptions/internal-server-error';

@Injectable()
export default class UsersRepositoryService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async create(dto: createUserDto): Promise<string> {
        try {
            const newUser = await this.usersRepository.create(dto);
            await this.usersRepository.save(newUser);
            return newUser.id;
        } catch (err) {
            throw new InternalServerError('User creation has been failed');
        }
    }

    async update(dto: updateUserDto) {

    }

    async getById(id: string) {

    }

    async getAll(): Promise<User[]> {
        try {
            return await this.usersRepository.find();
        } catch (err) {
            throw new InternalServerError('Users find has been failed');
        }
    }

    async delete(id: string) {

    }
}
