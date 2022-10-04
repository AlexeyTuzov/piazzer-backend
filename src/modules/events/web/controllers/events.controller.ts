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
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { CreateEventDto } from '../../application/dto/createEvent.dto'
import { EventShortDto } from '../../application/dto/response/eventShort.dto'
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
		@AuthUser() creator,
		@Body() body: CreateEventDto,
		@Response() res,
	) {
		const event = await this.eventsService.create(creator, body)
		res.json(event.id)
	}

	@Get()
	async eventsFind(@Query() dto: ListingDto) {
		const result = await this.eventsService.getFiltered(dto)
		return {
			...result,
			data: this.mapper.mapArray(result.data, Event, EventShortDto),
		}
	}

	@Get('/:id')
	async eventsRead(@Param('id') id: string) {
		const event = await this.eventsService.getById(id)
		return this.mapper.map(event, Event, EventShortDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch('/:id')
	eventsUpdate(@Param('id') id: string, @Body() body: UpdateEventDto) {
		return this.eventsService.update(id, body)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	eventsRemove(@Param('id') id: string) {
		return this.eventsService.delete(id)
	}

	@Get(':eventId/requests')
	getRequests() {
		return this.eventsService.getRequests()
	}

	@Post(':eventId/requests/:scheduleItemId/confirm')
	confirmRequest() {
		return this.eventsService.confirmRequest()
	}

	@Post(':eventId/requests/:scheduleItemId/cancel')
	cancelRequest() {
		return this.eventsService.cancelRequest()
	}
}
