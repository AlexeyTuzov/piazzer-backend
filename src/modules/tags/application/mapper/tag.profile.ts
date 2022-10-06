import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { createMap, Mapper, MappingProfile } from '@automapper/core'
import { Tag } from '../../domain/entities/tags.entity'
import { TagReadDto } from '../dto/tagRead.dto'

export class TagProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(mapper, Tag, TagReadDto)
		}
	}
}
