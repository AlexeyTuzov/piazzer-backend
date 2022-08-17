import { User } from './users.entity';
import { Repository } from 'typeorm';
import createUserDto from './DTO/create-user.dto';
import updateUserDto from './DTO/update-user.dto';
export default class UsersRepositoryService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(dto: createUserDto): Promise<string>;
    update(dto: updateUserDto): Promise<void>;
    getById(id: string): Promise<void>;
    getAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
}
