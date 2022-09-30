import {
	Body,
	Controller,
	Post,
	Get,
	Query,
	Param,
	Patch,
	Delete,
	HttpCode,
	UseGuards,
} from '@nestjs/common'
import { VenuesService } from '../../application/services/venues.service'
import CreateVenueDto from '../../application/dto/createVenue.dto'
import UpdateVenueDto from '../../application/dto/updateVenue.dto'
import CreateScheduleItemDto from '../../application/dto/createScheduleItem.dto'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'

@Controller('venues')
@UseGuards(jwtAuthGuard)
export class VenuesController {
	constructor(private readonly venuesService: VenuesService) {}

	@Post()
	venuesCreate(@Body() body: CreateVenueDto) {
		return this.venuesService.create(body)
	}

	@Get()
	venuesFind(@Query() dto) {
		return this.venuesService.getFiltered(dto)
	}

	@Get('/:id')
	venuesRead(@Param('id') id: string) {
		return this.venuesService.getById(id)
	}

	@Patch('/:id')
	venuesUpdate(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
		return this.venuesService.update(id, dto)
	}

	@Delete('/:id')
	@HttpCode(204)
	venuesRemove(@Param('id') id: string) {
		return this.venuesService.delete(id)
	}

	@Get('/:id/schedule')
	venuesScheduleList(@Param('id') id: string, @Query() dto) {
		return this.venuesService.getSchedule(id, dto)
	}

	@Post('/:id/schedule')
	venuesScheduleItemCreate(
		@Param('id') id: string,
		dto: CreateScheduleItemDto,
	) {
		return this.venuesService.createScheduleItem(id, dto)
	}

	@Post('/:id/schedule/:scheduleId/approve')
	@HttpCode(204)
	venuesScheduleItemApprove(
		@Param('id') id: string,
		@Param('scheduleId') scheduleId: string,
	) {
		return this.venuesService.approveScheduleItem(id, scheduleId)
	}

	@Post('/:id/schedule/:scheduleId/decline')
	@HttpCode(204)
	venuesScheduleItemDecline(
		@Param('id') id: string,
		@Param('scheduleId') scheduleId: string,
	) {
		return this.venuesService.declineScheduleItem(id, scheduleId)
	}
}
