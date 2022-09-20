import { IsDefined, IsEmail, IsString, Length } from "class-validator";

export default class UpdateUserDto {

    @IsEmail()
    readonly email?: string;

    @Length(6)
    readonly password?: string;

    @IsString()
    readonly name?: string;
}
