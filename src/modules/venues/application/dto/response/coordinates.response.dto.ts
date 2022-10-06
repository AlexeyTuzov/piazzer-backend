import { AutoMap } from '@automapper/classes'

export default class CoordinatesResponseDto {
	@AutoMap()
	lat: number

	@AutoMap()
	lon: number
}
