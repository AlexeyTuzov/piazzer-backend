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
	HttpStatus,
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
@UseGuards(jwtAuthGuard)
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Get()
	async usersFind(@AuthUser() authUser: User, @Query() query: ListingDto) {
		const result = await this.usersService.getAll(query, authUser)
		return {
			...result,
			data: this.mapper.mapArray(result.data, User, UserResponseDto),
		}
	}

	@Get('/:id')
	async usersRead(@AuthUser() authUser: User, @Param('id') id: string) {
		const user = await this.usersService.getOne(authUser, id, [
			'communications',
		])
		return this.mapper.map(user, User, UserResponseDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch('/:id')
	usersUpdate(
		@AuthUser() authUser: User,
		@Param('id') id: string,
		@Body() dto: UpdateUserDto,
	) {
		return this.usersService.update(authUser, id, dto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	usersRemove(@AuthUser() authUser, @Param('id') id: string) {
		return this.usersService.delete(authUser, id)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/change-role/:userRole')
	usersChangeRole(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('userRole') userRole: UserRolesEnum,
	) {
		return this.usersService.usersChangeRole(authUser, userId, userRole)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/block')
	usersBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		return this.usersService.usersBlock(authUser, userId)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/unblock')
	usersUnBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		return this.usersService.usersUnBlock(authUser, userId)
	}

	@Get(':userId/communications')
	communicationsFind(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Query() query: ListingDto,
	) {
		return this.usersService.communicationsGetAll(authUser, userId, query)
	}

	@Post(':userId/communications')
	async communicationAdd(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Body() body: CommunicationAddDto,
		@Response() res,
	) {
		const communication = await this.usersService.communicationAdd(
			authUser,
			userId,
			body,
		)
		res.json(communication.id)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':userId/communications/:communicationId')
	communicationsRemove(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		return this.usersService.communicationsRemove(
			authUser,
			userId,
			communicationId,
		)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/communications/:communicationId/confirm')
	communicationsConfirm(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
		@Body() body: CommunicationConfirmDto,
	) {
		return this.usersService.communicationsConfirm(
			authUser,
			userId,
			communicationId,
			body,
		)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/communications/:communicationId/confirm/send-code')
	communicationsConfirmSendCode(
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		//TODO
	}
}
