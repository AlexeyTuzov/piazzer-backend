import { Injectable } from '@nestjs/common'
import { DataSource, In } from 'typeorm'
import { Resource } from '../../domain/entities/resources.entity'
import { YandexCloudService } from './yandexCloud.service'
import { CreateResourceDto } from '../dto/createResource.dto'
import { TransformerTypeDto } from '../dto/transformerType.dto'
import { ResizeService } from './resize.service'

@Injectable()
export class ResourcesService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly s3Yandex: YandexCloudService, // private readonly resizeService: ResizeService,
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

	async getAll(query) {
		const response = {
			limit: query.limit,
			page: query.page,
			total: 0,
			data: [],
			$aggregations: {},
			$filters: [],
		}

		const resources = Resource.createQueryBuilder('resource')

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

	getOne(resourceId: string) {
		return this.dataSource.transaction(async (em) => {
			return await em
				.getRepository(Resource)
				.findOneByOrFail({ id: resourceId })
		})
	}

	update(resourceId: string, body) {
		return this.dataSource.transaction(async (em) => {
			const resource = await em
				.getRepository(Resource)
				.findOneByOrFail({ id: resourceId })
			em.getRepository(Resource).merge(resource, Object.assign(resource, body))
			await resource.save()
		})
	}

	remove(resourceId: string) {
		return this.dataSource.transaction(async (em) => {
			await em.getRepository(Resource).findOneByOrFail({ id: resourceId })
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
		// return (await this.s3Yandex.downloadWithStream(fileId)).pipe(
		// 	this.resizeService.transformer(dto),
		// );
		return
	}

	async getByIds(ids: string[]): Promise<Resource[]> {
		return await Resource.find({
			where: {
				id: In(ids),
			},
		})
	}
}
