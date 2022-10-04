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
import { CommentsReadDto } from '../dto/commentsRead.dto'

export class CommentsProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper)
	}

	override get profile(): MappingProfile {
		return (mapper: Mapper) => {
			createMap(
				mapper,
				Comment,
				CommentsReadDto,
				forMember((destination) => destination.resources, ignore()),
				afterMap(async (source, destination) => {
					console.log('attachments')
					destination['attachments'] = await source.resources
				}),
			)
		}
	}
}
