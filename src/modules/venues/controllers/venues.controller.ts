import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import CreateScheduleItemDto from '../application/DTO/createScheduleItem.dto';
import CreateVenueDto from '../application/DTO/createVenue.dto';
import UpdateVenueDto from '../application/DTO/updateVenue.dto';
import { VenuesService } from '../application/services/venues.service';
import FilterVenueDto from '../infrastructure/filterVenue.dto';
import getToken from '../../../infrastructure/utilites/getToken';

@Controller('venues')
export class VenuesController {

    constructor(private venuesService: VenuesService) { }

    @Post()
    venuesCreate(@Body() dto: CreateVenueDto, @Headers('Authorization') header: string) {
        return this.venuesService.create(dto, getToken(header));
    }

    @Get()
    venuesFind(@Query() dto: FilterVenueDto) {
        return this.venuesService.getFiltered(dto);
    }

    @Get('/:id')
    venuesRead(@Param('id') id: string) {
        return this.venuesService.getById(id);
    }

    @Patch('/:id')
    venuesUpdate(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
        return this.venuesService.update(id, dto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    venuesRemove(@Param('id') id: string) {
        return this.venuesService.delete(id);
    }

    @Get('/:id/schedule')
    venuesScheduleList(@Param('id') id: string, @Query() dto: FilterVenueDto) {
        return this.venuesService.getSchedule(id, dto);
    }

    @Post('/:id/schedule')
    venuesScheduleItemCreate(@Param('id') id: string, dto: CreateScheduleItemDto) {
        return this.venuesService.createScheduleItem(id, dto);
    }

    @Post('/:id/schedule/:scheduleId/approve')
    @HttpCode(HttpStatus.NO_CONTENT)
    venuesScheduleItemApprove(@Param('id') id: string, @Param('scheduleId') scheduleId: string) {
        return this.venuesService.approveScheduleItem(id, scheduleId);
    }

    @Post('/:id/schedule/:scheduleId/decline')
    @HttpCode(HttpStatus.NO_CONTENT)
    venuesScheduleItemDecline(@Param('id') id: string, @Param('scheduleId') scheduleId: string) {
        return this.venuesService.declineScheduleItem(id, scheduleId);
    }
}
