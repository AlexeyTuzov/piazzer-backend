import { IsEnum, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'
import { FitTypesEnum } from '../../domain/enums/fitTypes.enum'

export class TransformerTypeDto {
	@IsNumber()
	@Transform(({ value }) => Number(value))
	w: number

	@IsNumber()
	@Transform(({ value }) => Number(value))
	h: number

	@IsEnum(FitTypesEnum)
	fit: FitTypesEnum
}
