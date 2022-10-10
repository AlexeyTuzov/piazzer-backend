import { Mapper } from '@automapper/core'
import { InjectMapper } from '@automapper/nestjs'
import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UseGuards,
	Response,
	Query,
	Param,
	HttpCode,
	HttpStatus,
} from '@nestjs/common'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { AuthUser } from 'src/modules/auth/web/decorators/authUser.decorator'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { VenuesScheduleListDto } from 'src/modules/venues/application/dto/venuesScheduleList.dto'
import { VenueScheduleItem } from 'src/modules/venues/domain/entities/venueScheduleItem.entity'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { CreateEventDto } from '../../application/dto/createEvent.dto'
import { EventResponseDto } from '../../application/dto/response/event.response.dto'
import UpdateEventDto from '../../application/dto/updateEvent.dto'
import { EventsService } from '../../application/services/events.service'
import { Event } from '../../domain/entities/events.entity'

@Controller('events')
@UseGuards(jwtAuthGuard)
export class EventsController {
	constructor(
		private readonly eventsService: EventsService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Post()
	async eventsCreate(
		@AuthUser() creator: User,
		@Body() body: CreateEventDto,
		@Response() res,
	) {
		const event = await this.eventsService.create(creator, body)
		res.json(event.id)
	}

	@Get()
	async eventsFind(@AuthUser() authUser: User, @Query() dto: ListingDto) {
		const result = await this.eventsService.getFiltered(authUser, dto)
		return {
			...result,
			data: this.mapper.mapArray(result.data, Event, EventResponseDto),
		}
	}

	@Get('/:id')
	async eventsRead(@AuthUser() authUser: User, @Param('id') id: string) {
		const event = await this.eventsService.getById(authUser, id)
		return this.mapper.map(event, Event, EventResponseDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch('/:id')
	eventsUpdate(
		@AuthUser() authUser: User,
		@Param('id') id: string,
		@Body() body: UpdateEventDto,
	) {
		return this.eventsService.update(authUser, id, body)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	eventsRemove(@AuthUser() authUser: User, @Param('id') id: string) {
		return this.eventsService.delete(authUser, id)
	}

	@Get('/:id/requests')
	async eventsRequestsList(
		@AuthUser() authUser: User,
		@Param('id') id: string,
		@Query() dto: ListingDto,
	) {
		const result = await this.eventsService.getRequests(authUser, id, dto)
		return {
			...result,
			data: this.mapper.mapArray(
				result.data,
				VenueScheduleItem,
				VenuesScheduleListDto,
			),
		}
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('/:eventId/requests/:scheduleId/confirm')
	eventsScheduleItemConfirm(
		@AuthUser() authUser: User,
		@Param('eventId') eventId: string,
		@Param('scheduleId') scheduleId: string,
	) {
		return this.eventsService.confirmRequest(authUser, eventId, scheduleId)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post('/:eventId/requests/:scheduleId/cancel')
	eventsScheduleItemCancel(
		@AuthUser() authUser: User,
		@Param('eventId') eventId: string,
		@Param('scheduleId') scheduleId: string,
	) {
		return this.eventsService.cancelRequest(authUser, eventId, scheduleId)
	}
}
