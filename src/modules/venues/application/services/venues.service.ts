import { Injectable } from '@nestjs/common';
import { Token } from 'aws-sdk/lib/token';
import InternalServerError from 'src/infrastructure/exceptions/internal-server-error';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import JwtDecoder from 'src/modules/auth/infrastructure/jwtDecoder';
import { ResourcesService } from 'src/modules/resources/application/services/resources.service';
import { Resource } from 'src/modules/resources/domain/entities/resources.entity';
import { UsersService } from 'src/modules/users/application/services/users.service';
import { DataSource } from 'typeorm';
import { Venue } from '../../domain/entities/venues.entity';
import FilterVenueDto from '../../infrastructure/filterVenue.dto';
import CreateScheduleItemDto from '../DTO/createScheduleItem.dto';
import CreateVenueDto from '../DTO/createVenue.dto';
import UpdateVenueDto from '../DTO/updateVenue.dto';

@Injectable()
export class VenuesService {

    constructor(
        private dataSource: DataSource,
        private resourcesService: ResourcesService,
        private jwtDecoder: JwtDecoder,
        private usersService: UsersService) {
    }

    create(dto: CreateVenueDto, token: string): Promise<string> {

        return this.dataSource.transaction(async (em) => {
            const venue = em.getRepository(Venue).create();
            const ownerId = this.jwtDecoder.decodeUserId(token);
            const owner = await this.usersService.getById(ownerId);
            Object.assign(venue, { ...dto, owner });
            await em.save(venue);

            for (const id of dto.resourcesIds) {
                const resource = await this.resourcesService.getById(id);
                Object.assign(resource, { ...resource, belonging: venue });
                await em.save(resource);
            }

            return venue.id;
        });
    }

    getFiltered(dto: FilterVenueDto): Promise<Venue[]> {
        try {
            return this.dataSource.transaction(async () => {
                //TODO pagination
                const venues = Venue.find();
                return venues;
            });
        } catch (err) {
            throw new InternalServerError('Error getting venues');
        }
    }

    getById(id: string): Promise<Venue> {
        try {
            return this.dataSource.transaction(async () => {
                const venue = await Venue.findOne({ where: { id } });

                if (!venue) {
                    throw new NotFoundError('Venue not found');
                }

                return venue;
            })
        } catch (err) {
            throw new InternalServerError('Error getting venue');
        }
    }

    update(id: string, dto: UpdateVenueDto): Promise<void> {
        try {
            return this.dataSource.transaction(async () => {
                const venue = await Venue.findOne({ where: { id } });

                if (!venue) {
                    throw new NotFoundError('Venue not found');
                }

                await Venue.update(id, { ...dto });
                return;
            });
        } catch (err) {
            throw new InternalServerError('Venue update has been failed');
        }
    }

    delete(id: string): Promise<void> {
        try {
            return this.dataSource.transaction(async () => {
                const venue = await Venue.findOne({ where: { id } });

                if (!venue) {
                    throw new NotFoundError('Venue not found');
                }

                await venue.softRemove();
                return;
            });
        } catch (err) {
            throw new InternalServerError('Venue deletion has been failed');
        }
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
