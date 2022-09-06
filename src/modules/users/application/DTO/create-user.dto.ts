import UserRoles from "../../domain/enums/user-roles";

export default class CreateUserDto {

    readonly email: string;

    readonly password: string;

    readonly name: string;

    readonly phone: string;

    readonly role: UserRoles;
}
