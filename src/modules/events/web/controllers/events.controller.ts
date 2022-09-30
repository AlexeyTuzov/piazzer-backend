import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { EventsService } from '../../application/services/events.service'

@Controller('events')
@UseGuards(jwtAuthGuard)
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Post()
	create() {
		return this.eventsService.create()
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
