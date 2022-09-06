import UserRoles from "../../domain/enums/user-roles";

export default class SearchUserDto {

    readonly email?: string;

    readonly name?: string;

    readonly phone?: string;

    readonly role?: UserRoles;
}
