import UserTypes from "../../domain/enums/user-types";
import { AutoMap } from '@automapper/classes';

export default class CreateUserDto {

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly password: string;

    @AutoMap()
    readonly name: string;
}
