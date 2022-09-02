import { Injectable } from '@nestjs/common';
import filterCommDto from 'src/utilites/Pagination/DTO/filter-comm.dto';
import CommunicationsRepositoryService from './communications-repository.service';
import createCommDto from './DTO/create-comm.dto';

@Injectable()
export class CommunicationsService {

    constructor(private commRepositoryService: CommunicationsRepositoryService) {
    }

    create(dto: createCommDto) {
        return this.commRepositoryService.create(dto);
    }

    getAllUserComms(dto: filterCommDto) {
        return this.commRepositoryService.getAllUserComms(dto);
    }

    delete(id: string) {
        return this.commRepositoryService.delete(id);
    }
}
