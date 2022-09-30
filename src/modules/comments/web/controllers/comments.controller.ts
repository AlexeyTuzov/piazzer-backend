import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common'
import { CommentsService } from '../../application/services/comments.service'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@UseGuards(jwtAuthGuard)
	async create() {
		return this.commentsService.create()
	}

	@Get()
	getAll() {
		return this.commentsService.getAll()
	}

	@Get(':commentId')
	getOne() {
		return this.commentsService.getOne()
	}

	@Patch(':commentId')
	@UseGuards(jwtAuthGuard)
	update() {
		return this.commentsService.update()
	}

	@Delete(':commentId')
	@UseGuards(jwtAuthGuard)
	delete() {
		return this.commentsService.delete()
	}
}
