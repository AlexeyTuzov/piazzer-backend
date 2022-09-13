import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import FilterResourcesDto from '../../infrastructure/filter-resources.dto';
import CreateResourceDto from '../DTO/createResource.dto';
import ImageResizeDto from '../DTO/imageResize.dto';
import UpdateResourceDto from '../DTO/updateResource.dto';

@Injectable()
export class ResourcesService {

    constructor(private dataSource: DataSource){ }

    async create(dto: CreateResourceDto){

    }

    async getFiltered(dto: FilterResourcesDto) {

    }

    async getById(id: string) {

    }

    async update(id: string, dto: UpdateResourceDto) {

    }

    async delete(id: string) {

    }

    async resolve(id: string) {

    }

    async imageResize(id: string, dto: ImageResizeDto) {

    }
}
