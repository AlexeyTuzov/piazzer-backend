import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UseGuards,
	Response,
	Query,
	Param,
	HttpCode,
} from '@nestjs/common'
import { CommentsService } from '../../application/services/comments.service'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { AuthUser } from '../../../auth/web/decorators/authUser.decorator'
import { CommentsCreateDto } from '../../application/dto/commentsCreate.dto'
import { ListingDto } from '../../../../infrastructure/pagination/dto/listing.dto'
import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/core'
import { CommentsResponseDto } from '../../application/dto/response/comments.response.dto'
import { Comment } from '../../domain/entities/comments.entity'
import { CommentsUpdateDto } from '../../application/dto/commentsUpdate.dto'

@Controller('comments')
export class CommentsController {
	constructor(
		private readonly commentsService: CommentsService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Post()
	@UseGuards(jwtAuthGuard)
	async create(
		@AuthUser() authUser,
		@Body() body: CommentsCreateDto,
		@Response() res,
	) {
		const comment = await this.commentsService.create(body, authUser)
		res.json(comment.id)
	}

	@Get()
	async getAll(@Query() query: ListingDto) {
		const comments = await this.commentsService.getAll(query)
		return {
			...comments,
			data: comments.data.map((item) =>
				this.mapper.map(item, Comment, CommentsResponseDto),
			),
		}
	}

	@Get(':commentId')
	async getOne(@Param('commentId') id: string) {
		const comment = await this.commentsService.getOne({ id })
		return this.mapper.map(comment, Comment, CommentsResponseDto)
	}

	@HttpCode(204)
	@Patch(':commentId')
	@UseGuards(jwtAuthGuard)
	update(@Param('commentId') id: string, @Body() body: CommentsUpdateDto) {
		return this.commentsService.update({ id }, body)
	}

	@HttpCode(204)
	@Delete(':commentId')
	@UseGuards(jwtAuthGuard)
	delete(@Param('commentId') id: string) {
		return this.commentsService.delete({ id })
	}
}
