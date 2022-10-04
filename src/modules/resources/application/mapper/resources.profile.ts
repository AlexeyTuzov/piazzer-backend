import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, Mapper, MappingProfile } from '@automapper/core'
import { Resource } from '../../domain/entities/resources.entity'
import { ResourcesResponseDto } from '../dto/resources.response.dto'

export class ResourcesProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Resource, ResourcesResponseDto)
		}
	}
}
