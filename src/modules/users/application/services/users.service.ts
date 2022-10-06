import { Injectable } from '@nestjs/common'
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

@Injectable()
export class UsersService {
	constructor(private readonly dataSource: DataSource) {}

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

	async getOne(criteria, relations?: string[]) {
		return this.dataSource.transaction(async () => {
			return User.findOneOrFail({
				where: criteria,
				relations,
				withDeleted: true,
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

			if (authUser.isAdmin()) {
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

	async update(criteria, body) {
		await this.dataSource.transaction(async () => {
			await this.getOne(criteria)
			await User.update(criteria, body)
		})
	}

	async delete(criteria) {
		await this.dataSource.transaction(async () => {
			await this.getOne(criteria)
			await User.softRemove(criteria)
		})
	}

	async usersChangeRole(id: string, role: UserRolesEnum) {
		await this.dataSource.transaction(async () => {
			await User.findOneByOrFail({ id })
			await User.update(
				{ id },
				{
					role,
				},
			)
		})
	}

	async usersBlock(id: string) {
		await this.dataSource.transaction(async () => {
			await this.getOne({ id })
			await User.update({ id }, { blocked: true })
		})
	}

	async usersUnBlock(id: string) {
		await this.dataSource.transaction(async () => {
			await this.getOne({ id })
			return User.update({ id }, { blocked: false })
		})
	}

	async communicationsGetAll(userId: string, query: ListingDto) {
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
			.withDeleted()

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

	async communicationAdd(userId: string, body) {
		return this.dataSource.transaction(async () => {
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

	async communicationsConfirm(userId: string, communicationId: string, body) {
		await this.dataSource.transaction(async () => {
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

	async communicationsRemove(userId: string, communicationId: string) {
		await this.dataSource.transaction(async () => {
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
}
