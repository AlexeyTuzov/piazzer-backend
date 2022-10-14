import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, In } from 'typeorm'
import CreateTagDto from '../dto/createTag.dto'
import { Tag } from '../../domain/entities/tags.entity'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import { AccessControlService } from 'src/infrastructure/accessControlModule/service/access-control.service'
import { User } from 'src/modules/users/domain/entities/users.entity'
import ScopesEnum from 'src/infrastructure/accessControlModule/enums/scopes.enum'
import { TagTypesEnum } from "../../domain/enums/tagTypes.enum";

@Injectable()
export class TagsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly accessControlService: AccessControlService,
	) {}

	async create(body: CreateTagDto, authUser: User): Promise<Tag> {
		return this.dataSource.transaction(async () => {

			if (body.type !== TagTypesEnum.PROPERTY) {
				this.accessControlService.checkAdminRights(authUser)
			}

			const tag = Tag.create()
			Object.assign(tag, body)
			await tag.save()
			return tag
		})
	}

	async getFiltered(query, userId?: string) {
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

			const tags = Tag.createQueryBuilder('tags')

			FindService.apply(tags, this.dataSource, Tag, 'tags', query.query)
			SortService.apply(tags, this.dataSource, Tag, 'tags', query.sort)

			if (scopes.includes(ScopesEnum.ALL)) {
				tags.withDeleted()
			}

			await tags
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

	async getById(id: string, userId?: string): Promise<Tag> {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)
			const withDeleted = scopes.includes(ScopesEnum.ALL)
			const tag = await Tag.findOne({
				where: { id },
				withDeleted,
			})

			if (!tag) {
				throw new HttpException(
					{
						message: 'Tag not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: HttpStatus.NOT_FOUND,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return tag
		})
	}

	async update(authUser: User, id: string, dto): Promise<void> {
		return this.dataSource.transaction(async () => {
			this.accessControlService.checkAdminRights(authUser)
			await this.getById(id)
			await Tag.update(id, dto)
		})
	}

	async delete(authUser: User, id: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			this.accessControlService.checkAdminRights(authUser)
			const tag = await this.getById(id)
			await em.softRemove(tag)
		})
	}

	async getByIds(ids: string[]): Promise<Tag[]> {
		return await Tag.find({
			where: {
				id: In(ids),
			},
		})
	}
}
