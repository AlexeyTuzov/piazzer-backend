import { Transform, Type } from 'class-transformer';
import { IsEnum, isNumber, IsNumber } from 'class-validator';
import FitTypes from "../../domain/enums/fitTypes";

export class ImageResizeDto {

    @IsNumber()
    @Type(() => Number)
    w: number;

    @IsNumber()
    @Type(() => Number)
    h: number;

    @IsEnum(FitTypes)
    readonly fit: FitTypes;

}