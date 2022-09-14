import { Injectable } from '@nestjs/common';
import InternalServerError from 'src/infrastructure/exceptions/internal-server-error';
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
        try {
            return this.dataSource.transaction(async () => {
                const resource = Resource.create();
                Object.assign(resource, dto);
                await resource.save();
                return resource.id;
            });
        } catch (err) {
            throw new InternalServerError('Resource creation has been failed');
        }

    }

    async getFiltered(dto: FilterResourcesDto): Promise<Resource[]> {
        try {
            return this.dataSource.transaction(async () => {
                //TODO pagination
                const resources = Resource.find();
                return resources;
            });
        } catch (err) {
            throw new InternalServerError('Error getting resources');
        }
    }

    async getById(id: string): Promise<Resource> {
        try {
            return this.dataSource.transaction(async () => {
                const resource = await Resource.findOne({ where: { id } });

                if (!resource) {
                    throw new NotFoundError('Resource not found');
                }

                return resource;
            })
        } catch (err) {
            throw new InternalServerError('Error getting resource');
        }
    }

    async update(id: string, dto: UpdateResourceDto): Promise<void> {
        try {
            return this.dataSource.transaction(async () => {
                const resource = await Resource.findOne({ where: { id } });

                if (!resource) {
                    throw new NotFoundError('Resource not found');
                }

                await Resource.update(id, { ...dto });
                return;
            });
        } catch (err) {
            throw new InternalServerError('Resource update has been failed');
        }
    }

    async delete(id: string) {
        try {
            return this.dataSource.transaction(async () => {
                const resource = await Resource.findOne({ where: { id } });

                if (!resource) {
                    throw new NotFoundError('User not found');
                }

                await resource.softRemove();
                return;
            })
        } catch (err) {
            throw new InternalServerError('Resource deletion has been failed');
        }
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
