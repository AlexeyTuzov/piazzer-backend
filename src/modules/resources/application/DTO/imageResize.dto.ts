import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

import FitTypes from "../../domain/enums/fitTypes";

export default class ImageResizeDto {

    @IsNumber()
    @Transform(({ value }) => Number(value))
    readonly w: number;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    readonly h: number;

    @IsEnum(FitTypes)
    readonly fit: FitTypes;

}