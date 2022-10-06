import {
	Body,
	Controller,
	Post,
	UploadedFile,
	Response,
	UseInterceptors,
	Get,
	Query,
	Param,
	Patch,
	Delete,
	HttpCode,
	UseGuards,
	Redirect,
	HttpStatus,
} from '@nestjs/common'
import { ResourcesService } from '../../application/services/resources.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthUser } from '../../../auth/web/decorators/authUser.decorator'
import jwtAuthGuard from '../../../auth/web/guards/jwt-auth.guard'
import { CreateResourceDto } from '../../application/dto/createResource.dto'
import { ListingDto } from '../../../../infrastructure/pagination/dto/listing.dto'
import { UpdateResourceDto } from '../../application/dto/updateResource.dto'
import { TransformerTypeDto } from '../../application/dto/transformerType.dto'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import { Roles } from 'src/infrastructure/decorators/roles.decorator'
import { User } from '../../../users/domain/entities/users.entity'

@Controller('resources')
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	async create(
		@AuthUser('id') creatorId,
		@Body() body,
		@UploadedFile() file,
		@Response() res,
	) {
		const data: CreateResourceDto = {
			size: file?.size,
			name: body.name ?? file?.originalname,
			mimeType: file?.mimetype,
			file: file?.buffer,
			type: body.type,
			link: body.link,
		}

		const resource = await this.resourcesService.create(creatorId, data)

		res.json(resource.id)
	}

	@Get()
	getAll(@AuthUser() authUser, @Query() query: ListingDto) {
		return this.resourcesService.getAll(query, authUser)
	}

	@Get(':resourceId')
	getOne(@AuthUser() authUser, @Param('resourceId') resourceId: string) {
		return this.resourcesService.getOne(resourceId, authUser)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Patch(':resourceId')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	update(
		@AuthUser() authUser: User,
		@Param('resourceId') resourceId: string,
		@Body() body: UpdateResourceDto,
	) {
		return this.resourcesService.update(resourceId, body, authUser)
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':resourceId')
	@Roles(UserRolesEnum.ADMIN, UserRolesEnum.USER)
	@UseGuards(jwtAuthGuard)
	remove(@AuthUser() authUser: User, @Param('resourceId') resourceId: string) {
		return this.resourcesService.remove(resourceId, authUser)
	}

	@Get(':resourceId/resolve')
	@Redirect('', 303)
	async resolve(@Param('resourceId') resourceId: string, @Response() res) {
		const link = await this.resourcesService.resolve(resourceId)
		return { url: link }
	}

	@Get(':resourceId/image-resize')
	async imageResize(
		@Param('resourceId') id: string,
		@Query() param: TransformerTypeDto,
		@Response() res,
	) {
		const file = await this.resourcesService.imageResize(id, param)
		file.pipe(res)
	}
}
