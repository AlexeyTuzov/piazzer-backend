import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import FilterResourcesDto from '../../infrastructure/filter-resources.dto';
import CreateResourceDto from '../DTO/create-resource.dto';
import ImageResizeDto from '../DTO/image-resize.dto';
import UpdateResourceDto from '../DTO/update-resource.dto';

@Injectable()
export class ResourcesService {

    constructor(private dataSource: DataSource){
    }

    async create(dto: CreateResourceDto){

    }

    async getAll(dto: FilterResourcesDto) {

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
