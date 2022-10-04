import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { afterMap, createMap, Mapper, MappingProfile } from '@automapper/core'
import { VenueScheduleItem } from '../../domain/entities/venueScheduleItem.entity'
import { VenuesScheduleListDto } from '../dto/venuesScheduleList.dto'

export class VenuesScheduleProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(
				mapper,
				VenueScheduleItem,
				VenuesScheduleListDto,
				afterMap((source, destination) => {
					destination.eventId = source.event?.id
					destination.venueId = source.venue?.id
				}),
			)
		}
	}
}
