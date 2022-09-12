import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import FilterVenueDto from '../../infrastructure/filterVenue.dto';
import CreateScheduleItemDto from '../DTO/createScheduleItem.dto';
import CreateVenueDto from '../DTO/createVenue.dto';
import UpdateVenueDto from '../DTO/updateVenue.dto';

@Injectable()
export class VenuesService {

    constructor(private dataSource: DataSource) {
    }

    create(dto: CreateVenueDto) {

    }

    getFiltered(dto: FilterVenueDto) {

    }

    getById(id: string) {

    }

    update(id: string, dto: UpdateVenueDto) {

    }

    delete(id: string) {

    }

    getSchedule(id: string, dto: FilterVenueDto) {

    }

    createScheduleItem(id: string, dto: CreateScheduleItemDto) {

    }

    approveScheduleItem(id: string, scheduleId: string) {

    }

    declineScheduleItem(id: string, scheduleId: string) {
        
    }
}
