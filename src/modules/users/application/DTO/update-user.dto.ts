import UserRoles from "../../domain/enums/user-roles";

export default class UpdateUserDto {

    readonly id?: string;

    readonly email?: string;

    readonly password?: string;

    readonly name?: string;
}
