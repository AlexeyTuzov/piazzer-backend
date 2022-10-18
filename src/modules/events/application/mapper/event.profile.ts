import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import {
	createMap,
	forMember,
	mapFrom,
	Mapper,
	MappingProfile,
} from '@automapper/core'
import { Event } from '../../domain/entities/events.entity'
import { EventShortDto } from '../dto/response/eventShort.dto'
import { EventResponseDto } from '../dto/response/event.response.dto'
import { VenueScheduleItem } from 'src/modules/venues/domain/entities/venueScheduleItem.entity'
import { OnlyApproved } from '../dto/response/onlyApproved.dto'

export class VenuesScheduleProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Event, EventResponseDto)
			createMap(mapper, Event, EventShortDto)
			createMap(
				mapper,
				VenueScheduleItem,
				OnlyApproved,
				forMember(
					(source) => source.event['venue'],
					mapFrom((source) => {
						return (source.event['venue'] = source.venue)
					}),
				),
			)
		}
	}
}
