import { IsEmail, IsString } from "class-validator";

export default class SearchUserDto {

    @IsEmail()
    @IsString()
    readonly email?: string;

    @IsString()
    readonly name?: string;
}
