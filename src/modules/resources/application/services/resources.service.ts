import { Injectable } from '@nestjs/common';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { DataSource } from 'typeorm';
import { Resource } from '../../domain/entities/resources.entity';
import ResourcesTypes from '../../domain/enums/resourceTypes';
import FilterResourcesDto from '../../infrastructure/filter-resources.dto';
import ResizeService from '../../infrastructure/resize.service';
import YandexCloudService from '../../infrastructure/yandexCloud.service';
import CreateResourceDto from '../DTO/createResource.dto';
import ImageResizeDto from '../DTO/imageResize.dto';
import UpdateResourceDto from '../DTO/updateResource.dto';

@Injectable()
export class ResourcesService {

    constructor(
        private dataSource: DataSource,
        private yandexS3: YandexCloudService,
        private resizeService: ResizeService) { }

    async create(dto: CreateResourceDto): Promise<string> {
        return this.dataSource.transaction(async () => {
            const resource = Resource.create();
            Object.assign(resource, dto);
            await resource.save();
            return resource.id;
        });
    }

    async getFiltered(dto: FilterResourcesDto): Promise<Resource[]> {
        return this.dataSource.transaction(async () => {
            //TODO pagination
            const resources = Resource.find();
            return resources;
        });
    }

    async getById(id: string): Promise<Resource> {
        return this.dataSource.transaction(async () => {
            const resource = await Resource.findOne({ where: { id } });

            if (!resource) {
                throw new NotFoundError('Resource not found');
            }

            return resource;
        });
    }

    async update(id: string, dto: UpdateResourceDto): Promise<void> {
        return this.dataSource.transaction(async () => {
            const resource = await Resource.findOne({ where: { id } });

            if (!resource) {
                throw new NotFoundError('Resource not found');
            }

            await Resource.update(id, { ...dto });
            return;
        });
    }

    async delete(id: string) {
        return this.dataSource.transaction(async () => {
            const resource = await Resource.findOne({ where: { id } });

            if (!resource) {
                throw new NotFoundError('Resource not found');
            }

            await resource.softRemove();
            return;
        });
    }

    async resolve(id: string) {
        const resource = await this.getById(id);

        if (resource.type === ResourcesTypes.LINK) {
            return resource.link;
        } else {
            return this.yandexS3.downloadWithLink(id);
        }
    }

    async imageResize(id: string, dto: ImageResizeDto) {
        const stream = await this.yandexS3.downloadWithStream(id);
        return stream.pipe(this.resizeService.transformer(dto));
    }
}
