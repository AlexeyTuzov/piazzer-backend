import { IsEnum, IsNumberString, IsString } from 'class-validator';

enum SortDirections {
    'asc' = 'asc',
    'desc' = 'desc'
}

export default class filterDto {

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