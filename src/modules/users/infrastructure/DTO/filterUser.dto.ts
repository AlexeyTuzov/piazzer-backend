import { IsNumberString, IsString } from 'class-validator';
import SortDirections from 'src/infrastructure/pagination/enums/sortDirections';

export default class FilterUserDto {

    readonly sorts?: [
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

    @IsString({ message: 'Should be a string' })
    readonly filter?: string;
}