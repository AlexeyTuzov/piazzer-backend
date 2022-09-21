import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { transacting } from 'src/infrastructure/database/transacting';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { EntityManager } from 'typeorm';
import { Resource } from '../../domain/entities/resources.entity';
import ResourcesTypes from '../../domain/enums/resourceTypes';
import FilterResourcesDto from '../../infrastructure/filter-resources.dto';
import ResizeService from '../../infrastructure/resize.service';
import AWSCloudService from '../../infrastructure/AWSCloud.service';
import CreateResourceDto from '../DTO/createResource.dto';
import {ImageResizeDto} from '../DTO/imageResize.dto';
import UpdateResourceDto from '../DTO/updateResource.dto';
import sharp from 'sharp';
import * as axios from 'axios';
import * as https from 'https';

@Injectable()
export class ResourcesService {

    constructor(
        private AWS3: AWSCloudService,
        private resizeService: ResizeService) { }

    async create(dto: CreateResourceDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            console.log('dto:', dto);
            if (dto.type === ResourcesTypes.FILE) {
                const resource = em.getRepository(Resource).create();
                Object.assign(resource, dto);
                await em.save(resource);
                await this.AWS3.upload(dto.file, resource.id);
                return resource.id;
            }

            try {
                const { headers } = await axios.default.head(dto.link, {
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                });

                const size = headers['content-length'] ? +headers['content-length'] : 0;
                const mimeType = headers['content-type'] ? headers['content-type'] : 'not found';

                const resource = em.getRepository(Resource).create();
                Object.assign(resource, { ...dto, mimeType, size });

                await em.save(resource);
                return resource.id;
            } catch (err) {
                throw new HttpException('ERROR_IN_LINK', HttpStatus.BAD_REQUEST);
            }
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
            const resource = await em.getRepository(Resource).findOne(
                { where: { id }, relations: ['venue'] }
            );

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
            await this.AWS3.delete(id);
            await em.softRemove(resource);
        }, em);
    }

    async resolve(id: string): Promise<string> {
        const resource = await this.getById(id);

        if (resource.type === ResourcesTypes.LINK) {
            return resource.link;
        } else {
            return this.AWS3.downloadWithLink(id);
        }
    }

    async imageResize(id: string, dto: ImageResizeDto): Promise<sharp.Sharp> {
        const stream = await this.AWS3.downloadWithStream(id);
        return stream.pipe(this.resizeService.transformer(dto));
    }
}
