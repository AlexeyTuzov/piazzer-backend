import { Injectable } from '@nestjs/common';
import { CommunicationsService } from 'src/modules/communications/application/services/communications.service';
import CreateCommDto from 'src/modules/communications/application/DTO/create-comm.dto';
import FilterUserDto from 'src/infrastructure/pagination/DTO/filter-user.dto';
import ChangeRoleDto from '../DTO/change-role.dto';
import CreateUserDto from '../DTO/create-user.dto';
import SearchUserDto from '../DTO/search-user.dto';
import ConfirmUserCommDto from '../DTO/confirm-user-comm.dto';
import LogInUserDto from '../DTO/login-user.dto';
import UpdateUserDto from '../DTO/update-user.dto';
import InternalServerError from '../../../../infrastructure/exceptions/internal-server-error';
import NoContentResponse from '../../../../infrastructure/exceptions/no-content-response';
import { User } from '../../domain/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
                private commService: CommunicationsService) {
    }

    //TODO: use transactions instead try-catch and add auto-mapper!!!
    //TODO: try to use MapPipe() inside a controller instead @InjectMapper in constructor
    async create(dto: CreateUserDto): Promise<string> {
        try {
            const newUser = this.usersRepository.create(dto);
            await this.usersRepository.save(newUser);
            return newUser.id;
        } catch (err) {
            throw new InternalServerError('User creation has been failed');
        }
    }

    async update(dto: UpdateUserDto): Promise<NoContentResponse> {
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
            throw new InternalServerError('users search has been failed');
        }

    }

    async getOne(dto: SearchUserDto): Promise<User> {
        try {
            return await this.usersRepository.findOne({ where: { ...dto } });
        } catch (err) {
            throw new InternalServerError('users search has been failed');
        }

    }

    async getAll(dto: FilterUserDto): Promise<User[]> {
        try {
            return await this.usersRepository.find();
            //TODO pagination
        } catch (err) {
            throw new InternalServerError('users search has been failed');
        }
    }

    async delete(id: string): Promise<NoContentResponse> {
        try {
            const userToBeDeleted = await this.usersRepository.findOne({ where: { id } });
            userToBeDeleted.deletedAt = new Date().toDateString();
            await this.usersRepository.save(userToBeDeleted);
            return new NoContentResponse('User has been deleted');
        } catch (err) {
            throw new InternalServerError('users deletion has been failed');
        }
    }

    async createComm(id: string, dto: CreateCommDto) {
        const newComm = await this.commService.create(dto);
        const user = await this.usersRepository.findOne({ where: { id } });
        user.Communications.push(newComm);
        //TODO: Check if user.communications array are really saved in DB
        return newComm.id;
    }

    async deleteComm(id: string, commID: string) {
        //TODO: Need to check if communication being deleted from user's model
        //if user ID is not needed - remove it from params as redundant
        return this.commService.delete(commID);
    }

    //TODO: following methods should be in another services (e-mailer/admin)
    async confirmComm(id: string, dto: ConfirmUserCommDto) {
        //here we gonna call the mailer service's method
    }

    async logIn(dto: LogInUserDto) {

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
