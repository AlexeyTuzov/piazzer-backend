import { AutoMap } from '@automapper/classes';

export default class SignUpDto {

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly password: string;

    @AutoMap()
    readonly name: string;

    @AutoMap()
    readonly role?: string;

    @AutoMap()
    readonly telephone?: string;
}