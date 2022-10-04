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
} from '@nestjs/common'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { AuthUser } from 'src/modules/auth/web/decorators/authUser.decorator'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { CreateEventDto } from '../../application/dto/createEvent.dto'
import { EventShortDto } from '../../application/dto/response/eventShort.dto'
import { EventsService } from '../../application/services/events.service'
import { Event } from '../../domain/entities/events.entity'

@Controller('events')
@UseGuards(jwtAuthGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService,
        @InjectMapper() private readonly mapper: Mapper
    ) { }

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
            data: this.mapper.mapArray(result.data, Event, EventShortDto)
        }
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
