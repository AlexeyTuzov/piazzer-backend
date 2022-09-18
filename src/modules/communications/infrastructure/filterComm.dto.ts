import { IsNumberString, IsString } from 'class-validator';

export default class FilterCommDto {

    @IsNumberString()
    readonly limit?: number;

    @IsNumberString()
    readonly page?: number;

    @IsString({ message: 'Should be a string' })
    readonly query?: string;
}