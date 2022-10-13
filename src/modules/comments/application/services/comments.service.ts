import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, FindOptionsWhere } from 'typeorm'
import { Comment } from '../../domain/entities/comments.entity'
import { ResourcesService } from '../../../resources/application/services/resources.service'
import { VenuesService } from '../../../venues/application/services/venues.service'
import { CommentEntityTypesEnum } from '../../domain/enums/commentEntityTypes.enum'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import { CommentsCreateDto } from '../dto/commentsCreate.dto'
import { User } from '../../../users/domain/entities/users.entity'
import { AccessControlService } from 'src/infrastructure/accessControlModule/service/access-control.service'
import ScopesEnum from 'src/infrastructure/accessControlModule/enums/scopes.enum'

@Injectable()
export class CommentsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly resourcesService: ResourcesService,
		private readonly venueService: VenuesService,
		private accessControlService: AccessControlService,
	) {}

	create(body: CommentsCreateDto, authUser: User) {
		return this.dataSource.transaction(async () => {
			if (
				body.entityId &&
				body.entityType === CommentEntityTypesEnum.VENUE_SCHEDULE_ITEM
			) {
				await this.venueService.scheduleItemFindOneByOrFail({
					id: body.entityId,
				})
			}

			if (body.parentId) {
				await this.getOne({ id: body.parentId })
			}

			const comment = Comment.create()

			const resources = await this.resourcesService.getByIds(
				body.attachmentsIds,
			)
			Object.assign(comment, {
				...body,
				resources,
				creator: authUser,
			})

			await comment.save()
			return comment
		})
	}

	getAll(query, userId?: string) {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)
			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const comments = Comment.createQueryBuilder('comment')
				.leftJoinAndMapMany(
					'comment.resources',
					'comment.resources',
					'resources',
				)
				.leftJoinAndMapOne('comment.creator', 'comment.creator', 'creator')

			if (scopes.includes(ScopesEnum.ALL)) {
				comments.withDeleted()
			}

			FindService.apply(
				comments,
				this.dataSource,
				Comment,
				'comment',
				query.query,
			)
			SortService.apply(
				comments,
				this.dataSource,
				Comment,
				'comment',
				query.sort,
			)

			await comments
				.skip((response.page - 1) * response.limit)
				.take(response.limit)
				.getManyAndCount()
				.then(([data, total]) => {
					response.data = data
					response.total = total
				})

			return response
		})
	}

	getOne(
		criteria: FindOptionsWhere<Comment>,
		userId?: string,
	): Promise<Comment> {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)
			const withDeleted = scopes.includes(ScopesEnum.ALL)
			const comment = await Comment.findOne({
				where: criteria,
				relations: ['resources', 'creator'],
				withDeleted,
			})

			if (!comment) {
				throw new HttpException(
					{
						message: 'Comment not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return comment
		})
	}

	update(criteria: FindOptionsWhere<Comment>, body, authUser: User) {
		return this.dataSource.transaction(async (em) => {
			const comment = await Comment.findOneOrFail({
				where: criteria,
				relations: ['resources', 'creator'],
			})
			const creatorId = comment.creator.id
			this.accessControlService.checkOwnership(authUser, creatorId)
			const resources = await this.resourcesService.getByIds(
				body.attachmentsIds,
			)
			em.getRepository(Comment).merge(comment, { ...body, resources })
			await comment.save()
		})
	}

	delete(criteria: FindOptionsWhere<Comment>, authUser: User) {
		return this.dataSource.transaction(async (em) => {
			const comment = await Comment.findOneOrFail({
				where: criteria,
				relations: ['resources', 'creator'],
			})
			const creatorId = comment.creator.id
			this.accessControlService.checkOwnership(authUser, creatorId)
			await em.getRepository(Comment).softDelete(criteria)
		})
	}
}
