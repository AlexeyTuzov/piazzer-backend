import { AutoMap } from "@automapper/classes";

export default class CredentialsDto {

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly password: string;
}