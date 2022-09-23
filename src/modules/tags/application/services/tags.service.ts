import { Injectable } from '@nestjs/common';
import FilterTagsDto from '../../infrastructure/filterTags.dto';
import CreateTagDto from '../DTO/createTag.dto';
import UpdateTagDto from '../DTO/updateTag.dto';
import { EntityManager } from 'typeorm';
import { transacting } from '../../../../infrastructure/database/transacting';
import { Tag } from '../../domain/entities/tags.entity';
import NotFoundError from '../../../../infrastructure/exceptions/not-found';

@Injectable()
export class TagsService {

    constructor() {
    }

    async create(dto: CreateTagDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const tag = em.getRepository(Tag).create();
            Object.assign(tag, dto);
            await em.save(tag);
            return tag.id;
        }, em);
    }

    async getFiltered(dto: FilterTagsDto, em?: EntityManager): Promise<Tag[]> {
        return transacting(async (em) => {
            //TODO pagination
            return await em.getRepository(Tag).find();
        }, em);
    }

    async getById(id: string, em?: EntityManager): Promise<Tag> {
        return transacting(async (em) => {
            const tag = await em.getRepository(Tag).findOne({ where: { id } });

            if (!tag) {
                throw new NotFoundError('Tag not found');
            }

            return tag;
        }, em);
    }

    async update(id: string, dto: UpdateTagDto, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            await this.getById(id);
            await em.getRepository(Tag).update(id, dto);
        }, em);
    }

    async delete(id: string, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            const tag = await this.getById(id);
            await em.softRemove(tag);
        }, em);
    }
}
