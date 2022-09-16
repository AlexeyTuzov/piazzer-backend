import { Injectable } from '@nestjs/common';
import FilterTagsDto from '../../infrastructure/filterTags.dto';
import CreateTagDto from '../DTO/createTag.dto';
import UpdateTagDto from '../DTO/updateTag.dto';

@Injectable()
export class TagsService {

    constructor() {
    }

    create(dto: CreateTagDto) {

    }

    getFiltered(dto: FilterTagsDto) {

    }

    getById(id: string) {

    }

    update(id: string, dto: UpdateTagDto) {

    }

    delete(id: string) {
        
    }
}
