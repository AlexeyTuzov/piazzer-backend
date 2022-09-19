import { Injectable } from '@nestjs/common';
import { transacting } from 'src/infrastructure/database/transacting';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import JwtDecoder from 'src/modules/auth/infrastructure/jwtDecoder';
import { ResourcesService } from 'src/modules/resources/application/services/resources.service';
import { UsersService } from 'src/modules/users/application/services/users.service';
import { EntityManager } from 'typeorm';
import { Venue } from '../../domain/entities/venues.entity';
import FilterVenueDto from '../../infrastructure/filterVenue.dto';
import CreateScheduleItemDto from '../DTO/createScheduleItem.dto';
import CreateVenueDto from '../DTO/createVenue.dto';
import UpdateVenueDto from '../DTO/updateVenue.dto';

@Injectable()
export class VenuesService {

    constructor(
        private resourcesService: ResourcesService,
        private jwtDecoder: JwtDecoder,
        private usersService: UsersService) {
    }

    create(dto: CreateVenueDto, token: string, em?: EntityManager): Promise<string> {

        return transacting(async (em) => {
            const venue = em.getRepository(Venue).create();
            const ownerId = this.jwtDecoder.decodeUserId(token);
            const owner = await this.usersService.getById(ownerId);
            Object.assign(venue, { ...dto, owner });
            await em.save(venue);

            //TODO: need to check if resourcesIds exist!!!
            for (const id of dto.resourcesIds) {
                const resource = await this.resourcesService.getById(id);
                Object.assign(resource, { ...resource, belonging: venue });
                await em.save(resource);
            }

            return venue.id;
        }, em);
    }

    getFiltered(dto: FilterVenueDto, em?: EntityManager): Promise<Venue[]> {

        return transacting(async (em) => {
            //TODO pagination
            const venues = em.getRepository(Venue).find();
            return venues;
        }, em);
    }

    //TODO: add attributes and properties to relations!!!!
    getById(id: string, em?: EntityManager): Promise<Venue> {
        return transacting(async (em) => {
            const venue = await em.getRepository(Venue).findOne(
                {
                    where: { id },
                    relations: ['resources', 'attributes', 'properties']
                });

            if (!venue) {
                throw new NotFoundError('Venue not found');
            }

            return venue;
        }, em);
    }

    update(id: string, dto: UpdateVenueDto, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            await this.getById(id);
            await em.getRepository(Venue).update(id, { ...dto });
        }, em);
    }

    delete(id: string, em?: EntityManager): Promise<void> {
        return transacting(async (em) => {
            const venue = await this.getById(id);
            await em.softRemove(venue);
        }, em);
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
