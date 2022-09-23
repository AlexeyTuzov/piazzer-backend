import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Communication } from '../../../communications/domain/entities/communications.entity';

export default class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsArray()
    readonly communications?: Communication[];
}
