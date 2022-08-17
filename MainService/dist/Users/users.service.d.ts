import { UseCases } from '../abstractions/UseCases';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
import UsersRepositoryService from './users-repository.service';
export declare class UsersService implements UseCases {
    private usersRepositoryService;
    constructor(usersRepositoryService: UsersRepositoryService);
    create(dto: createUserDto): Promise<string>;
    update(dto: updateUserDto): Promise<void>;
    getById(id: string): Promise<void>;
    getAll(): Promise<import("./users.entity").User[]>;
    delete(id: string): Promise<void>;
}
