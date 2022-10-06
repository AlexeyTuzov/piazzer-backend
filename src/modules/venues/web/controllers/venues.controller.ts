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
	Response,
} from '@nestjs/common'
import { VenuesService } from '../../application/services/venues.service'
import CreateVenueDto from '../../application/dto/createVenue.dto'
import UpdateVenueDto from '../../application/dto/updateVenue.dto'
import CreateScheduleItemDto from '../../application/dto/createScheduleItem.dto'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { ListingDto } from '../../../../infrastructure/pagination/dto/listing.dto'
import { AuthUser } from '../../../auth/web/decorators/authUser.decorator'
import { Mapper } from '@automapper/core'
import { VenueScheduleItem } from '../../domain/entities/venueScheduleItem.entity'
import { InjectMapper } from '@automapper/nestjs'
import { VenuesScheduleListDto } from '../../application/dto/venuesScheduleList.dto'
import { VenueReadDto } from '../../application/mapper/venueRead.dto'
import { Venue } from '../../domain/entities/venues.entity'

@Controller('venues')
@UseGuards(jwtAuthGuard)
export class VenuesController {
	constructor(
		private readonly venuesService: VenuesService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Post()
	async venuesCreate(
		@AuthUser() authUser,
		@Body() body: CreateVenueDto,
		@Response() res,
	) {
		const venue = await this.venuesService.create(body, authUser)
		res.json(venue.id)
	}

	@Get()
	async venuesFind(@Query() query: ListingDto) {
		const result = await this.venuesService.getFiltered(query)
		return {
			...result,
			data: this.mapper.mapArray(result.data, Venue, VenueReadDto),
		}
	}

	@Get('/:id')
	async venuesRead(@Param('id') id: string) {
		const venue = await this.venuesService.getById(id)
		return this.mapper.map(venue, Venue, VenueReadDto)
	}

	@HttpCode(204)
	@Patch('/:id')
	venuesUpdate(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
		return this.venuesService.update(id, dto)
	}

	@HttpCode(204)
	@Delete('/:id')
	venuesRemove(@Param('id') id: string) {
		return this.venuesService.delete(id)
	}

	@Get('/:id/schedule')
	async venuesScheduleList(
		@Param('id') id: string,
		@Query() query: ListingDto,
	) {
		const result = await this.venuesService.getSchedule(id, query)
		return {
			...result,
			data: this.mapper.mapArray(
				result.data,
				VenueScheduleItem,
				VenuesScheduleListDto,
			),
		}
	}

	@Post('/:id/schedule')
	async venuesScheduleItemCreate(
		@Param('id') id: string,
		@Body() body: CreateScheduleItemDto,
		@Response() res,
	) {
		const schedule = await this.venuesService.createScheduleItem(id, body)
		res.json(schedule.id)
	}

	@HttpCode(204)
	@Post('/:venueId/schedule/:venueScheduleId/approve')
	venuesScheduleItemApprove(
		@Param('venueId') venueId: string,
		@Param('venueScheduleId') venueScheduleId: string,
	) {
		return this.venuesService.approveScheduleItem(venueId, venueScheduleId)
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
