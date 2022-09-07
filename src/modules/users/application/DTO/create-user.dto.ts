import UserRoles from "../../domain/enums/user-roles";
import { AutoMap } from '@automapper/classes';

export default class CreateUserDto {

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly password: string;

    @AutoMap()
    readonly name: string;

    @AutoMap()
    readonly phone: string;

    @AutoMap()
    readonly role: UserRoles;
}
