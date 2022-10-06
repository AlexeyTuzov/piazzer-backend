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
import { Roles } from 'src/infrastructure/decorators/roles.decorator'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		@InjectMapper() private readonly mapper: Mapper,
	) {}

	@Get()
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	async usersFind(@AuthUser() authUser, @Query() query: ListingDto) {
		const result = await this.usersService.getAll(query, authUser)
		return {
			...result,
			data: this.mapper.mapArray(result.data, User, UserResponseDto),
		}
	}

	@Get('/:id')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	async usersRead(@AuthUser() authUser: User, @Param('id') id: string) {
		if (!authUser.isAdmin() && id !== authUser.id) {
			throw new ForbiddenException()
		}
		const user = await this.usersService.getOne({ id }, ['communications'])
		return this.mapper.map(user, User, UserResponseDto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch('/:id')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	usersUpdate(
		@AuthUser() authUser: User,
		@Param('id') id: string,
		@Body() dto: UpdateUserDto,
	) {
		if (!authUser.isAdmin() && id !== authUser.id) {
			throw new ForbiddenException()
		}
		return this.usersService.update({ id }, dto)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('/:id')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	usersRemove(@AuthUser() authUser, @Param('id') id: string) {
		if (authUser.id === id) {
			throw new ForbiddenException()
		}
		//TODO по спеке пользователь может удалить сам себя
		return this.usersService.delete({ id })
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/change-role/:userRole')
	@Roles(UserRolesEnum.ADMIN)
	@UseGuards(jwtAuthGuard)
	usersChangeRole(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('userRole') userRole: UserRolesEnum,
	) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersChangeRole(userId, userRole)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/block')
	@Roles(UserRolesEnum.ADMIN)
	@UseGuards(jwtAuthGuard)
	usersBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersBlock(userId)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/unblock')
	@Roles(UserRolesEnum.ADMIN)
	@UseGuards(jwtAuthGuard)
	usersUnBlock(@AuthUser() authUser, @Param('userId') userId: string) {
		if (authUser.id === userId) {
			throw new ForbiddenException()
		}
		return this.usersService.usersUnBlock(userId)
	}

	@Get(':userId/communications')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	communicationsFind(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Query() query: ListingDto,
	) {
		if (!authUser.isAdmin() && authUser.id !== userId) {
			throw new ForbiddenException()
		}
		return this.usersService.communicationsGetAll(userId, query)
	}

	@Post(':userId/communications')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	async communicationAdd(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Body() body: CommunicationAddDto,
		@Response() res,
	) {
		if (!authUser.isAdmin() && authUser.id !== userId) {
			throw new ForbiddenException()
		}
		const communication = await this.usersService.communicationAdd(userId, body)
		res.json(communication.id)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':userId/communications/:communicationId')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	communicationsRemove(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		if (!authUser.isAdmin() && authUser.id !== userId) {
			throw new ForbiddenException()
		}
		return this.usersService.communicationsRemove(userId, communicationId)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/communications/:communicationId/confirm')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	communicationsConfirm(
		@AuthUser() authUser: User,
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
		@Body() body: CommunicationConfirmDto,
	) {
		if (!authUser.isAdmin() && authUser.id !== userId) {
			throw new ForbiddenException()
		}
		return this.usersService.communicationsConfirm(
			userId,
			communicationId,
			body,
		)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Post(':userId/communications/:communicationId/confirm/send-code')
	@UseGuards(jwtAuthGuard)
	communicationsConfirmSendCode(
		@Param('userId') userId: string,
		@Param('communicationId') communicationId: string,
	) {
		//TODO
	}
}
