import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	UseGuards,
	Response,
} from '@nestjs/common'
import { AuthUser } from 'src/modules/auth/web/decorators/authUser.decorator'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { CreateEventDto } from '../../application/dto/createEvent.dto'
import { EventsService } from '../../application/services/events.service'

@Controller('events')
@UseGuards(jwtAuthGuard)
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

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
	getAll() {
		return this.eventsService.getAll()
	}

	@Get(':eventId')
	getOne() {
		return this.eventsService.getOne()
	}

	@Patch(':eventId')
	update() {
		return this.eventsService.update()
	}

	@Delete(':eventId')
	delete() {
		return this.eventsService.delete()
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
