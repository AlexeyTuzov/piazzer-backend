import { IsEmail, IsString } from "class-validator";

export default class UpdateUserDto {

    @IsEmail()
    @IsString()
    readonly email?: string;

    @IsString()
    readonly password?: string;

    @IsString()
    readonly name?: string;
}
