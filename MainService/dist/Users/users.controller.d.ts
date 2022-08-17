import { UsersService } from './users.service';
import updateUserDto from './DTO/update-user.dto';
import createUserDto from './DTO/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(dto: createUserDto): Promise<string>;
    updateUser(id: string, dto: updateUserDto): Promise<void>;
    getUserByID(id: string): Promise<void>;
    getAllUsers(): Promise<import("./users.entity").User[]>;
    deleteUser(id: string): Promise<void>;
}
