import { AutoMap } from '@automapper/classes';

export default class UpdateUserDto {

    @AutoMap()
    readonly email?: string;

    @AutoMap()
    readonly password?: string;

    @AutoMap()
    readonly name?: string;
}
