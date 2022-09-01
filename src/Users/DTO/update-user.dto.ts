import UserRoles from "../Enums/user-roles";

export default class updateUserDto {

    readonly id?: string;

    readonly email?: string;

    readonly password?: string;

    readonly name?: string;

    readonly phone?: string;

    readonly role?: UserRoles;
}
