import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	Response,
	ForbiddenException,
} from '@nestjs/common'
import { UsersService } from '../../application/services/users.service'
import { UpdateUserDto } from '../../application/dto/updateUser.dto'
import { UserRolesEnum } from '../../domain/enums/userRoles.enum'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/core'
import { User } from '../../domain/entities/users.entity'
import { UserResponseDto } from '../../application/dto/response/user.response.dto'
import { ListingDto } from '../../../../infrastructure/pagination/dto/listing.dto'
import { AuthUser } from '../../../auth/web/decorators/authUser.decorator'
import { CommunicationAddDto } from '../../../communications/application/dto/communicationAdd.dto'
import { CommunicationConfirmDto } from '../../../communications/application/dto/communicationConfirm.dto'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Get()
	@UseGuards(jwtAuthGuard)
	async usersFind(@Query() query: ListingDto) {
		const result = await this.usersService.getAll(query)
		return {
			...result,
			data: this.mapper.mapArray(result.data, User, UserResponseDto),
		}
	}

	@Get('/:id')
	async usersRead(@Param('id') id: string) {
		const user = await this.usersService.getOne({ id }, ['communications'])
		return this.mapper.map(user, User, UserResponseDto)
	}

	@HttpCode(204)
	@UseGuards(jwtAuthGuard)
	@Patch('/:id')
	usersUpdate(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update({ id }, dto)
	}

	@Delete('/:id')
	@HttpCode(204)
	@UseGuards(jwtAuthGuard)
	usersRemove(@AuthUser() authUser, @Param('id') id: string) {
		if (authUser.id === id) {
			throw new ForbiddenException()
		}
		return this.usersService.delete({ id })
	}

	@HttpCode(204)
	@Post(':userId/change-role/:userRole')
	@UseGuards(jwtAuthGuard)
	usersChangeRole(
		@AuthUser() authUser,
		@Param('userId') userId: string,
		@Param('userRole') userRole: UserRolesEnum,
	) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersChangeRole(userId, userRole)
	}

	@HttpCode(204)
	@Post(':userId/block')
	@UseGuards(jwtAuthGuard)
	usersBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersBlock(userId)
	}

	@HttpCode(204)
	@Post(':userId/unblock')
	@UseGuards(jwtAuthGuard)
	usersUnBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersUnBlock(userId)
	}

	@Get(':userId/communications')
	@UseGuards(jwtAuthGuard)
	communicationsFind(
		@Param('userId') userId: string,
		@Query() query: ListingDto,
	) {
		return this.usersService.communicationsGetAll(userId, query)
	}

	@Post(':userId/communications')
	@UseGuards(jwtAuthGuard)
	async communicationAdd(
		@Param('userId') userId: string,
		@Body() body: CommunicationAddDto,
		@Response() res,
	) {
		const communication = await this.usersService.communicationAdd(userId, body)
		res.json(communication.id)
	}

	@HttpCode(204)
	@Delete(':userId/communications/:communicationId')
	@UseGuards(jwtAuthGuard)
	communicationsRemove(
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		return this.usersService.communicationsRemove(userId, communicationId)
	}

	@HttpCode(204)
	@Post(':userId/communications/:communicationId/confirm')
	@UseGuards(jwtAuthGuard)
	communicationsConfirm(
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
		@Body() body: CommunicationConfirmDto,
	) {
		return this.usersService.communicationsConfirm(
			userId,
			communicationId,
			body,
		)
	}

	@HttpCode(204)
	@Post(':userId/communications/:communicationId/confirm/send-code')
	@UseGuards(jwtAuthGuard)
	communicationsConfirmSendCode(
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		//TODO
	}
}
