import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class SignUpDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}