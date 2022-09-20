import { Injectable } from '@nestjs/common';
import { transacting } from 'src/infrastructure/database/transacting';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { EntityManager } from 'typeorm';
import { Resource } from '../../domain/entities/resources.entity';
import ResourcesTypes from '../../domain/enums/resourceTypes';
import FilterResourcesDto from '../../infrastructure/filter-resources.dto';
import ResizeService from '../../infrastructure/resize.service';
import YandexCloudService from '../../infrastructure/AWSCloud.service';
import CreateResourceDto from '../DTO/createResource.dto';
import ImageResizeDto from '../DTO/imageResize.dto';
import UpdateResourceDto from '../DTO/updateResource.dto';
import sharp from 'sharp';

@Injectable()
export class ResourcesService {

    constructor(
        private yandexS3: YandexCloudService,
        private resizeService: ResizeService) { }

    async create(dto: CreateResourceDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const resource = em.getRepository(Resource).create();
            Object.assign(resource, dto);
            await em.save(resource);
            return resource.id;
        }, em);
    }

    async getFiltered(dto: FilterResourcesDto, em?: EntityManager): Promise<Resource[]> {
        return transacting(async (em) => {
            //TODO pagination
            return await em.getRepository(Resource).find();
        }, em);
    }

    async getById(id: string, em?: EntityManager): Promise<Resource> {
        return transacting(async (em) => {
            const resource = await em.getRepository(Resource).findOne({ where: { id } });

            if (!resource) {
                throw new NotFoundError('Resource not found');
            }

            return resource;
        }, em);
    }

    async update(id: string, dto: UpdateResourceDto, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            await this.getById(id);
            await em.getRepository(Resource).update(id, { ...dto });
            return;
        }, em);
    }

    async delete(id: string, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            const resource = await this.getById(id);
            await em.softRemove(resource);
        }, em);
    }

    async resolve(id: string): Promise<string> {
        const resource = await this.getById(id);

        if (resource.type === ResourcesTypes.LINK) {
            return resource.link;
        } else {
            return this.yandexS3.downloadWithLink(id);
        }
    }

    async imageResize(id: string, dto: ImageResizeDto): Promise<sharp.Sharp> {
        const stream = await this.yandexS3.downloadWithStream(id);
        return stream.pipe(this.resizeService.transformer(dto));
    }
}
