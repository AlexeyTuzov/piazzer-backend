import UserRoles from "../Enums/user-roles";

export default class searchUserDto {

    readonly email?: string;

    readonly name?: string;

    readonly phone?: string;

    readonly role?: UserRoles;
}
