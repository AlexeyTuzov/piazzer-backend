import { ForbiddenException, Injectable } from '@nestjs/common'
import { DataSource, In } from 'typeorm'
import { Resource } from '../../domain/entities/resources.entity'
import { YandexCloudService } from './yandexCloud.service'
import { CreateResourceDto } from '../dto/createResource.dto'
import { TransformerTypeDto } from '../dto/transformerType.dto'
import { ResizeService } from './resize.service'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { User } from 'src/modules/users/domain/entities/users.entity'

@Injectable()
export class ResourcesService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly s3Yandex: YandexCloudService,
		private readonly resizeService: ResizeService,
	) {}

	create(creatorId: string, { file, ...other }: CreateResourceDto) {
		return this.dataSource.transaction(async () => {
			const resource = Resource.create()
			Object.assign(resource, other)
			resource.creatorId = creatorId
			await resource.save()
			await this.s3Yandex.upload(file, resource.id)
			return resource
		})
	}

	async getAll(query: ListingDto, authUser: User) {
		const response = {
			limit: query.limit,
			page: query.page,
			total: 0,
			data: [],
			$aggregations: {},
			$filters: [],
		}

		const resources = Resource.createQueryBuilder('resource')

		if (authUser.isAdmin()) {
			resources.withDeleted()
		}

		await resources
			.skip((response.page - 1) * response.limit)
			.take(response.limit)
			.getManyAndCount()
			.then(([data, total]) => {
				response.data = data
				response.total = total
			})

		return response
	}

	getOne(resourceId: string, authUser: User) {
		return this.dataSource.transaction(async (em) => {
			return await em.getRepository(Resource).findOneOrFail({
				where: { id: resourceId },
				withDeleted: authUser.isAdmin(),
			})
		})
	}

	update(resourceId: string, body, authUser: User) {
		return this.dataSource.transaction(async (em) => {
			const resource = await em.getRepository(Resource).findOneOrFail({
				where: { id: resourceId },
				relations: ['creator'],
			})
			if (!authUser.isAdmin() && resource.creatorId !== authUser.id) {
				throw new ForbiddenException()
			}
			em.getRepository(Resource).merge(resource, Object.assign(resource, body))
			await resource.save()
		})
	}

	remove(resourceId: string, authUser: User) {
		return this.dataSource.transaction(async (em) => {
			const resource = await em.getRepository(Resource).findOneOrFail({
				where: { id: resourceId },
				relations: ['creator'],
			})
			if (!authUser.isAdmin() && resource.creatorId !== authUser.id) {
				throw new ForbiddenException()
			}
			await em.getRepository(Resource).softDelete(resourceId)
		})
	}

	async resolve(resourceId: string) {
		await Resource.findOneByOrFail({ id: resourceId })
		return await this.s3Yandex.downloadWithLink(resourceId)
	}

	resolveBuffer(resourceId: string) {
		return this.s3Yandex.downloadBuffer(resourceId)
	}

	async imageResize(fileId, dto?: TransformerTypeDto) {
		return (await this.s3Yandex.downloadWithStream(fileId)).pipe(
			this.resizeService.transformer(dto),
		)
	}

	async getByIds(ids: string[]): Promise<Resource[]> {
		return await Resource.find({
			where: {
				id: In(ids),
			},
		})
	}
}
