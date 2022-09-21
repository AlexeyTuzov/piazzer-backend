import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import FitTypes from "../../domain/enums/fitTypes";

export class ImageResizeDto {

    @IsNumber()
    @Type(() => Number)
    readonly w: number;

    @IsNumber()
    @Type(() => Number)
    readonly h: number;

    @IsEnum(FitTypes)
    readonly fit: FitTypes;

}