import { IsNumber } from 'class-validator'

export default class CreateCoordinatesDto {
	@IsNumber()
	lat: number

	@IsNumber()
	lon: number
}
