import { IsEnum } from "class-validator";
import UserRoles from "../../domain/enums/user-types";

export default class ChangeRoleDto {

    @IsEnum(UserRoles)
    readonly role: UserRoles;
}
