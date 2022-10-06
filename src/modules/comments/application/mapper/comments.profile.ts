import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import {
	afterMap,
	createMap,
	forMember,
	ignore,
	Mapper,
	MappingProfile,
} from '@automapper/core'
import { Comment } from '../../domain/entities/comments.entity'
import { CommentsResponseDto } from '../dto/response/comments.response.dto'

export class CommentsProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(
				mapper,
				Comment,
				CommentsResponseDto,
				forMember((destination) => destination.resources, ignore()),
				afterMap(async (source, destination) => {
					destination['attachments'] = await source.resources
				}),
			)
		}
	}
}
