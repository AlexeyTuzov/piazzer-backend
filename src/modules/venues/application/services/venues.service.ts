import { Injectable } from '@nestjs/common';
import InternalServerError from 'src/infrastructure/exceptions/internal-server-error';
import NotFoundError from 'src/infrastructure/exceptions/not-found';
import { ResourcesService } from 'src/modules/resources/application/services/resources.service';
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
        private resourcesService: ResourcesService) {
    }

    create(dto: CreateVenueDto): Promise<string> {
        try {
            return this.dataSource.transaction(async () => {
                const venue = Venue.create();
                Object.assign(venue, dto);
                await venue.save();
                
                venue.resources.forEach(async (resource) => {
                    await this.resourcesService.update(resource.id, {...dto, belongingId: venue.id});
                })

                return venue.id;
            })
        } catch (err) {
            throw new InternalServerError('Venue creation has been failed');
        }
        
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
