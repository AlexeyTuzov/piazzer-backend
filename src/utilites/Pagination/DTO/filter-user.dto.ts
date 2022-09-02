import { IsNumberString, IsString } from 'class-validator';

enum SortDirections {
    'asc' = 'asc',
    'desc' = 'desc'
}

export default class filterUserDto {

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