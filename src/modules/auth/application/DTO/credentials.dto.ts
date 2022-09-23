import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class CredentialsDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}