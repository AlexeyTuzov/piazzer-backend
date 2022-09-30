import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	Response,
} from '@nestjs/common'
import { TagsService } from '../../application/services/tags.service'
import CreateTagDto from '../../application/dto/createTag.dto'
import UpdateTagDto from '../../application/dto/updateTag.dto'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { ListingDto } from '../../../../infrastructure/pagination/dto/listing.dto'

@Controller('tags')
export class TagsController {
	constructor(private tagsService: TagsService) {}

	@Post()
	@UseGuards(jwtAuthGuard)
	async tagsCreate(@Body() dto: CreateTagDto, @Response() res) {
		const tag = await this.tagsService.create(dto)
		res.json(tag.id)
	}

	@Get()
	tagsFind(@Query() query: ListingDto) {
		return this.tagsService.getFiltered(query)
	}

	@Get('/:id')
	tagsRead(@Param('id') id: string) {
		return this.tagsService.getById(id)
	}

	@Patch('/:id')
	@UseGuards(jwtAuthGuard)
	tagsUpdate(@Param('id') id: string, @Body() body: UpdateTagDto) {
		return this.tagsService.update(id, body)
	}

	@Delete('/:id')
	@UseGuards(jwtAuthGuard)
	tagsRemove(@Param('id') id: string) {
		return this.tagsService.delete(id)
	}
}
