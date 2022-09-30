import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import type { Mapper, MappingProfile } from '@automapper/core'
import { createMap } from '@automapper/core'
import { UserResponseDto } from '../../dto/response/user.response.dto'
import { User } from '../../../domain/entities/users.entity'

export class UserProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper) => {
			createMap(mapper, User, UserResponseDto)
		}
	}
}
