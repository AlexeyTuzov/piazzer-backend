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
	HttpStatus,
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
import { VenueResponseDto } from '../../application/dto/response/venue.response.dto'
import { Venue } from '../../domain/entities/venues.entity'

@Controller('venues')
export class VenuesController {
	constructor(
		private readonly venuesService: VenuesService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Post()
	@UseGuards(jwtAuthGuard)
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
			data: this.mapper.mapArray(result.data, Venue, VenueResponseDto),
		}
	}

	@Get('/:id')
	async venuesRead(@Param('id') id: string) {
		const venue = await this.venuesService.getById(id)
		return this.mapper.map(venue, Venue, VenueResponseDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch('/:id')
	@UseGuards(jwtAuthGuard)
	venuesUpdate(@Param('id') id: string, @Body() dto: UpdateVenueDto) {
		return this.venuesService.update(id, dto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	@UseGuards(jwtAuthGuard)
	venuesRemove(@Param('id') id: string) {
		return this.venuesService.delete(id)
	}

	@Get('/:id/schedule')
	@UseGuards(jwtAuthGuard)
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
	@UseGuards(jwtAuthGuard)
	async venuesScheduleItemCreate(
		@Param('id') id: string,
		@Body() body: CreateScheduleItemDto,
		@Response() res,
	) {
		const schedule = await this.venuesService.createScheduleItem(id, body)
		res.json(schedule.id)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(jwtAuthGuard)
	@Post('/:venueId/schedule/:venueScheduleId/approve')
	venuesScheduleItemApprove(
		@Param('venueId') venueId: string,
		@Param('venueScheduleId') venueScheduleId: string,
	) {
		return this.venuesService.approveScheduleItem(venueId, venueScheduleId)
	}

	@Post('/:id/schedule/:scheduleId/decline')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(jwtAuthGuard)
	venuesScheduleItemDecline(
		@Param('id') id: string,
		@Param('scheduleId') scheduleId: string,
	) {
		return this.venuesService.declineScheduleItem(id, scheduleId)
	}
}
