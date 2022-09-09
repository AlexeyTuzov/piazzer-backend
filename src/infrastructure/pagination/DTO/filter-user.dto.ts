import { IsNumberString, IsString } from 'class-validator';
import SortDirections from '../enums/sortDirections';

export default class FilterUserDto {

    readonly sort?: [
        {
            direction: SortDirections,
            field: string
        }

    ];

    @IsNumberString()
    readonly limit?: number;

    @IsNumberString()
    readonly page?: number;

    @IsString({ message: 'Should be a string' })
    readonly query?: string;
}