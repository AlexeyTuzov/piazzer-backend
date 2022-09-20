import { IsArray, IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { Communication } from '../../../communications/domain/entities/communications.entity';

export default class CreateUserDto {

    @IsDefined()
    @IsEmail()
    readonly email: string;

    @IsDefined()
    @Length(6)
    readonly password: string;

    @IsDefined()
    @IsString()
    readonly name: string;

    @IsArray()
    readonly communications?: Communication[];
}
