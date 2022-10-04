import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, In } from 'typeorm'
import CreateTagDto from '../dto/createTag.dto'
import { Tag } from '../../domain/entities/tags.entity'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'

@Injectable()
export class TagsService {
	constructor(private readonly dataSource: DataSource) {}

	async create(dto: CreateTagDto): Promise<Tag> {
		return this.dataSource.transaction(async () => {
			const tag = Tag.create()
			Object.assign(tag, dto)
			await tag.save()
			return tag
		})
	}

	async getFiltered(query) {
		return this.dataSource.transaction(async () => {
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

	async getById(id: string): Promise<Tag> {
		return this.dataSource.transaction(async () => {
			const tag = await Tag.findOne({ where: { id } })

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

	async update(id: string, dto): Promise<void> {
		return this.dataSource.transaction(async () => {
			await this.getById(id)
			await Tag.update(id, dto)
		})
	}

	async delete(id: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
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
