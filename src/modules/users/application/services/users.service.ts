import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'
import { User } from '../../domain/entities/users.entity'
import { CreateUserDto } from '../dto/createUser.dto'
import { CommunicationTypesEnum } from '../../../communications/domain/enums/communicationTypes.enum'
import { UserRolesEnum } from '../../domain/enums/userRoles.enum'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import { CommunicationConfirm } from '../../../verification-codes/domain/entities/communication-confirm.entity'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'
import { AccessControlService } from 'src/infrastructure/access-control/service/access-control.service'
import ScopesEnum from 'src/infrastructure/access-control/enums/scopes.enum'

@Injectable()
export class UsersService {
	constructor(
		private readonly dataSource: DataSource,
		@Inject(forwardRef(() => AccessControlService))
		private readonly accessControlService: AccessControlService,
	) {}

	async create(body: CreateUserDto): Promise<User> {
		return this.dataSource.transaction(async () => {
			const user = User.create({
				password: body.password,
				name: body.name,
				communications: [
					{
						type: CommunicationTypesEnum.EMAIL,
						value: body.email,
					},
				],
			})
			await user.save()
			return user
		})
	}

	async getOne(authUser: User, id: string, relations?: string[]) {
		return this.dataSource.transaction(async () => {
			const scopes = this.accessControlService.getAvailableScopes(
				[
					{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
					{ role: UserRolesEnum.USER, scopes: [ScopesEnum.OWNED] },
					{ role: UserRolesEnum.ANONYMOUS, scopes: [] },
				],
				authUser,
			)

			this.accessControlService.checkOwnership(authUser, id)

			const withDeleted = scopes.includes(ScopesEnum.ALL)

			return User.findOneOrFail({
				where: { id },
				relations,
				withDeleted,
			})
		})
	}

	getOneByEmail(email: string): Promise<User> {
		return this.dataSource.transaction(async () => {
			const communication = await Communication.findOne({
				where: {
					value: email,
				},
				relations: ['user'],
			})

			return communication?.user
		})
	}

	async verification(userId: string) {
		await User.update(userId, {
			verified: true,
		})
	}

	async getAll(query: ListingDto, authUser: User) {
		return this.dataSource.transaction(async () => {
			const scopes = this.accessControlService.getAvailableScopes(
				[
					{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
					{ role: UserRolesEnum.USER, scopes: [ScopesEnum.AVAILABLE] },
					{ role: UserRolesEnum.ANONYMOUS, scopes: [] },
				],
				authUser,
			)

			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const users = User.createQueryBuilder('user').leftJoinAndMapMany(
				'user.communications',
				'user.communications',
				'communications',
			)

			FindService.apply(users, this.dataSource, User, 'user', query.query)
			SortService.apply(users, this.dataSource, User, 'user', query.sort)

			if (scopes.includes(ScopesEnum.ALL)) {
				users.withDeleted()
			} else {
				users
					.andWhere('user.blocked = :blocked', { blocked: false })
					.andWhere('user.verified = :verified', { verified: true })
			}

			await users
				.skip((response.page - 1) * response.limit)
				.take(response.limit)
				.getManyAndCount()
				.then(([data, total]) => {
					response.data = data
					response.total = total
				})

			return response
		})
	}

	async update(authUser: User, id: string, body) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkOwnership(authUser, id)

			await this.getOne(authUser, id)
			await User.update(id, body)
		})
	}

	async delete(authUser: User, id: string) {
		await this.dataSource.transaction(async (em) => {
			this.accessControlService.checkAdminRights(authUser)
			this.accessControlService.checkNotSelf(authUser, id)
			await this.getOne(authUser, id)
			await em.getRepository(User).softDelete(id)
		})
	}

	async usersChangeRole(authUser: User, id: string, role: UserRolesEnum) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkAdminRights(authUser)
			this.accessControlService.checkNotSelf(authUser, id)
			await User.findOneByOrFail({ id })
			await User.update(
				{ id },
				{
					role,
				},
			)
		})
	}

	async usersBlock(authUser: User, id: string) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkAdminRights(authUser)
			this.accessControlService.checkNotSelf(authUser, id)

			await this.getOne(authUser, id)
			await User.update({ id }, { blocked: true })
		})
	}

	async usersUnBlock(authUser: User, id: string) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkAdminRights(authUser)
			this.accessControlService.checkNotSelf(authUser, id)

			await this.getOne(authUser, id)
			return User.update({ id }, { blocked: false })
		})
	}

	async communicationsGetAll(
		authUser: User,
		userId: string,
		query: ListingDto,
	) {
		const scopes = this.accessControlService.getAvailableScopes(
			[
				{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
				{ role: UserRolesEnum.USER, scopes: [ScopesEnum.AVAILABLE] },
			],
			authUser,
		)

		this.accessControlService.checkOwnership(authUser, userId)

		const response = {
			page: query.page,
			limit: query.limit,
			total: 0,
			data: [],
			$aggregations: {},
			$filters: [],
		}

		const communications = Communication.createQueryBuilder('communications')
			.leftJoin('communications.user', 'user')
			.where('user.id = :userId', { userId })

		if (scopes.includes(ScopesEnum.ALL)) {
			communications.withDeleted()
		}

		FindService.apply(
			communications,
			this.dataSource,
			Communication,
			'communications',
			query.query,
		)
		SortService.apply(
			communications,
			this.dataSource,
			Communication,
			'communications',
			query.sort,
		)

		await communications
			.skip((response.page - 1) * response.limit)
			.take(response.limit)
			.getManyAndCount()
			.then(([data, total]) => {
				response.total = total
				response.data = data
			})

		return response
	}

	async communicationAdd(authUser: User, userId: string, body) {
		return this.dataSource.transaction(async () => {
			this.accessControlService.checkOwnership(authUser, userId)

			const communication = Communication.create()
			Object.assign(communication, {
				...body,
				user: {
					id: userId,
				},
			})
			await communication.save()
			return communication
		})
	}

	async communicationsConfirm(
		authUser: User,
		userId: string,
		communicationId: string,
		body,
	) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkOwnership(authUser, userId)

			const record = await CommunicationConfirm.findOneOrFail({
				where: {
					code: body.code,
					communication: {
						id: communicationId,
					},
				},
			})

			const { affected } = await Communication.update(communicationId, {
				confirmed: true,
			})

			if (affected) {
				await CommunicationConfirm.delete(record.id)
			}
		})
	}

	async communicationsRemove(
		authUser: User,
		userId: string,
		communicationId: string,
	) {
		await this.dataSource.transaction(async () => {
			this.accessControlService.checkOwnership(authUser, userId)

			const communication = await Communication.findOneOrFail({
				where: {
					id: communicationId,
					user: {
						id: userId,
					},
				},
			})
			await Communication.delete({ id: communication.id })
		})
	}

	findOneOrFail(id: string) {
		return this.dataSource.transaction(async () => {
			return User.findOneOrFail({ where: { id } })
		})
	}
}
