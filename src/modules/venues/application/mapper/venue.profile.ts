import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, Mapper, MappingProfile } from '@automapper/core'
import { Venue } from '../../domain/entities/venues.entity'
import { VenueShortDto } from '../dto/response/venueShort.dto'
import { VenueResponseDto } from '../dto/response/venue.response.dto'

export class VenueProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Venue, VenueShortDto)
			createMap(mapper, Venue, VenueResponseDto)
		}
	}
}
