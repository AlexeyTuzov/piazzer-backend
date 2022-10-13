import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
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
			createMap(
				mapper,
				Venue,
				VenueResponseDto,
				forMember(
					(source) => source['$aggregations'],
					mapFrom((source) => {
						return (source['$aggregations'] = {
							schedules: {
								total: source.scheduleItems.length
							}
						})
					}),
				),
				forMember((source) => source.scheduleItems, ignore())
			)
		}
	}
}
