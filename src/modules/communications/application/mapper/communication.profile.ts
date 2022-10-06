import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, Mapper, MappingProfile } from '@automapper/core'
import { Communication } from '../../domain/entities/communications.entity'
import { CommunicationReadDto } from '../dto/communicationRead.dto'

export class CommunicationProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Communication, CommunicationReadDto)
		}
	}
}
