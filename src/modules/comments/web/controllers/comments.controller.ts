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
	HttpStatus,
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
import { User } from 'src/modules/users/domain/entities/users.entity'
import UserID from 'src/infrastructure/decorators/user.decorator'

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
	async getAll(@Query() query: ListingDto, @UserID() userId: string | null) {
		const comments = await this.commentsService.getAll(query, userId)
		return {
			...comments,
			data: comments.data.map((item) =>
				this.mapper.map(item, Comment, CommentsResponseDto),
			),
		}
	}

	@Get(':commentId')
	async getOne(
		@Param('commentId') id: string,
		@UserID() userId: string | null,
	) {
		const comment = await this.commentsService.getOne({ id }, userId)
		return this.mapper.map(comment, Comment, CommentsResponseDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch(':commentId')
	@UseGuards(jwtAuthGuard)
	update(
		@AuthUser() authUser: User,
		@Param('commentId') id: string,
		@Body() body: CommentsUpdateDto,
	) {
		return this.commentsService.update({ id }, body, authUser)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':commentId')
	@UseGuards(jwtAuthGuard)
	delete(@AuthUser() authUser: User, @Param('commentId') id: string) {
		return this.commentsService.delete({ id }, authUser)
	}
}
