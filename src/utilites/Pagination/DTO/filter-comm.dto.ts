import { IsNumberString, IsString } from 'class-validator';

enum SortDirections {
    'asc' = 'asc',
    'desc' = 'desc'
}

export default class filterCommDto {

    readonly userId: string;

    @IsNumberString()
    readonly limit?: number;

    @IsNumberString()
    readonly page?: number;

    @IsString({ message: 'Should be a string' })
    readonly query?: string;
}