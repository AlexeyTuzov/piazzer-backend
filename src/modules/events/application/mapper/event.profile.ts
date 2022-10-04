import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, Mapper, MappingProfile } from '@automapper/core'
import { Event } from '../../domain/entities/events.entity'
import { EventShortDto } from '../dto/eventShort.dto'

export class VenuesScheduleProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Event, EventShortDto)
		}
	}
}
