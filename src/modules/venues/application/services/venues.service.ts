import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Brackets, DataSource, FindOptionsWhere } from 'typeorm'
import { Venue } from '../../domain/entities/venues.entity'
import CreateScheduleItemDto from '../dto/createScheduleItem.dto'
import UpdateVenueDto from '../dto/updateVenue.dto'
import CreateVenueDto from '../dto/createVenue.dto'
import { FindService } from '../../../../infrastructure/findService'
import { SortService } from '../../../../infrastructure/sortService'
import { TagsService } from '../../../tags/application/services/tags.service'
import { ResourcesService } from '../../../resources/application/services/resources.service'
import { VenueScheduleItem } from '../../domain/entities/venueScheduleItem.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { VenueScheduleItemStatusesEnum } from '../../domain/enums/venueScheduleItemStatuses.enum'
import { VenuesFilterManager } from '../filters/venues.filterManager'
import { AccessControlService } from 'src/infrastructure/access-control/service/access-control.service'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import ScopesEnum from 'src/infrastructure/access-control/enums/scopes.enum'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { Communication } from '../../../communications/domain/entities/communications.entity'
import { ListingDto } from 'src/infrastructure/pagination/dto/listing.dto'

@Injectable()
export class VenuesService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly tagsService: TagsService,
		private readonly resourcesService: ResourcesService,
		private readonly accessControlService: AccessControlService,
	) {}

	async dataMapping(
		coverId?: string,
		resourcesIds?: string[],
		propertiesIds?: string[],
		attributesIds?: string[],
	) {
		const data = {} as Venue

		const resources = await this.resourcesService.getByIds(
			[].concat(resourcesIds, coverId),
		)
		data.resources = resources.filter((res) => resourcesIds.includes(res.id))

		if (coverId) {
			const coverIdInDB = resources.find((res) => res.id === coverId)?.id
			if (!coverIdInDB) {
				throw new HttpException(
					{
						message: 'Cover not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: HttpStatus.NOT_FOUND,
					},
					HttpStatus.NOT_FOUND,
				)
			}
			data.coverId = resources.find((res) => res.id === coverId)?.id || null
		}

		const tags = await this.tagsService.getByIds(
			[].concat(attributesIds, propertiesIds),
		)
		data.properties = tags.filter((tag) => propertiesIds.includes(tag.id))
		data.attributes = tags.filter((tag) => attributesIds.includes(tag.id))

		return data
	}

	create(body: CreateVenueDto, authUser) {
		return this.dataSource.transaction(async () => {
			const venue = Venue.create()
			const data = await this.dataMapping(
				body.coverId,
				body.resourcesIds,
				body.propertiesIds,
				body.attributesIds,
			)
			Object.assign(venue, { ...body, ...data })
			venue.owner = authUser
			venue.communications = body.communications.map((item) => {
				const communication = Communication.create()
				Object.assign(communication, item)
				return communication
			})

			await venue.save()

			return venue
		})
	}

	getFiltered(query: ListingDto, userId?: string) {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)

			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
				$filters: VenuesFilterManager.transformForResponse(),
			}

			const venues = Venue.createQueryBuilder('venues')
				.leftJoinAndMapMany('venues.resources', 'venues.resources', 'resources')
				.leftJoinAndMapMany(
					'venues.communications',
					'venues.communications',
					'communications',
				)
				.leftJoinAndMapMany(
					'venues.properties',
					'venues.properties',
					'properties',
				)
				.leftJoinAndMapMany(
					'venues.attributes',
					'venues.attributes',
					'attributes',
				)
				.leftJoinAndMapMany(
					'venues.scheduleItems',
					'venues.scheduleItems',
					'scheduleItems',
				)
				.leftJoinAndMapOne('venues.owner', 'venues.owner', 'owner')
				.leftJoinAndMapMany(
					'owner.communications',
					'owner.communications',
					'owner_communications',
				)

			FindService.apply(venues, this.dataSource, Venue, 'venues', query.query)
			SortService.apply(venues, this.dataSource, Venue, 'venues', query.sort)
			const filter = new Brackets((qb) => {
				query.filter ? VenuesFilterManager.apply(qb, query.filter) : {}
			})

			if (scopes.includes(ScopesEnum.ALL)) {
				venues.withDeleted().andWhere(filter)
			} else if (scopes.includes(ScopesEnum.AVAILABLE) && !userId) {
				venues
					.andWhere('venues.isBlocked = :isBlocked', { isBlocked: false })
					.andWhere('venues.isDraft = :isDraft', { isDraft: false })
					.andWhere(filter)
			} else if (scopes.includes(ScopesEnum.AVAILABLE) && userId) {
				venues
					.andWhere(
						new Brackets((qb) => {
							qb.where('venues.isBlocked IN (:...isBlockedArr)', {
								isBlockedArr: [true, false],
							})
								.andWhere('venues.isDraft IN (:...isDraftArr)', {
									isDraftArr: [true, false],
								})
								.andWhere('venues.ownerId = :ownerId2', { ownerId2: userId })
								.andWhere(filter)
						}),
					)
					.orWhere(
						new Brackets((qb) => {
							qb.where('venues.isBlocked = :isBlocked', { isBlocked: false })
								.andWhere('venues.isDraft = :isDraft', { isDraft: false })
								.andWhere('venues.ownerId != :ownerId', { ownerId: userId })
								.andWhere(filter)
						}),
					)
			}

			await venues
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

	getById(venueId: string, userId?: string): Promise<Venue> {
		return this.dataSource.transaction(async () => {
			const scopes =
				await this.accessControlService.getScopesIfPossiblyUnauthorized(userId)

			const withDeleted = scopes.includes(ScopesEnum.ALL)
			const venue = await Venue.findOneOrFail({
				where: { id: venueId },
				relations: [
					'resources',
					'communications',
					'properties',
					'attributes',
					'owner',
					'owner.communications',
					'scheduleItems',
				],
				withDeleted,
			})
			if (
				!venue ||
				(scopes.includes(ScopesEnum.AVAILABLE) && venue.isBlocked) ||
				(venue.isDraft && !userId)
			) {
				throw new HttpException(
					{
						message: 'Venue not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			if (venue.isDraft) {
				const user = await User.findOneOrFail({ where: { id: userId } })
				const ownerId = venue.owner.id
				this.accessControlService.checkOwnership(user, ownerId)
			}

			return venue
		})
	}

	update(authUser: User, id: string, body: UpdateVenueDto): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const venue = await Venue.findOneOrFail({
				where: { id },
				relations: ['resources', 'properties', 'attributes', 'owner'],
			})
			const ownerId = venue.owner.id
			this.accessControlService.checkOwnership(authUser, ownerId)

			const data = await this.dataMapping(
				body.coverId,
				body.resourcesIds,
				body.propertiesIds,
				body.attributesIds,
			)

			em.getRepository(Venue).merge(venue, { ...body, ...data })
			venue.resources = data.resources
			venue.properties = data.properties
			venue.attributes = data.attributes

			await venue.save()
		})
	}

	delete(authUser: User, venueId: string): Promise<void> {
		return this.dataSource.transaction(async (em) => {
			const venue = await em.getRepository(Venue).findOneOrFail({
				where: { id: venueId },
				relations: ['owner'],
			})
			const ownerId = venue.owner.id
			this.accessControlService.checkOwnership(authUser, ownerId)
			await em.getRepository(Venue).softDelete(venueId)
		})
	}

	getSchedule(authUser: User, venueId: string, query) {
		return this.dataSource.transaction(async (em) => {
			const scopes = this.accessControlService.getAvailableScopes(
				[
					{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
					{ role: UserRolesEnum.USER, scopes: [ScopesEnum.AVAILABLE] },
					{ role: UserRolesEnum.ANONYMOUS, scopes: [] },
				],
				authUser,
			)
			const withDeleted = scopes.includes(ScopesEnum.ALL)

			const response = {
				limit: query.limit,
				page: query.page,
				total: 0,
				data: [],
				$aggregations: {},
			}

			const venue = await em.getRepository(Venue).findOneOrFail({
				where: { id: venueId },
				relations: ['owner'],
				withDeleted,
			})

			const ownerId = venue.owner.id
			this.accessControlService.checkOwnership(authUser, ownerId)

			const schedule = VenueScheduleItem.createQueryBuilder('schedule')
				.leftJoinAndMapOne(
					'schedule.venue',
					'schedule.venue',
					'venue',
					'venue.id  = :venueId',
					{ venueId },
				)
				.leftJoinAndMapMany('venue.resources', 'venue.resources', 'resources')
				.leftJoinAndMapOne('schedule.event', 'schedule.event', 'event')
				.leftJoinAndMapOne('event.organizer', 'event.organizer', 'organizer')
				.where('venue.id  = :venueId', { venueId })

			if (scopes.includes(ScopesEnum.ALL)) {
				schedule.withDeleted()
			}

			FindService.apply(
				schedule,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.query,
			)
			SortService.apply(
				schedule,
				this.dataSource,
				VenueScheduleItem,
				'schedule',
				query.sort,
			)

			await schedule
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

	async createScheduleItem(
		id: string,
		body: CreateScheduleItemDto,
	): Promise<VenueScheduleItem> {
		return this.dataSource.transaction(async () => {
			const schedule = VenueScheduleItem.create()
			Object.assign(schedule, body)
			schedule.venue = await Venue.findOneByOrFail({ id: id })
			schedule.event = await Event.findOneByOrFail({ id: body.eventId })
			await schedule.save()
			return schedule
		})
	}

	async approveScheduleItem(
		authUser: User,
		venueId: string,
		scheduleId: string,
	): Promise<void> {
		await this.dataSource.transaction(async (em) => {
			const venue = await em.getRepository(Venue).findOneOrFail({
				where: { id: venueId },
				relations: ['owner'],
			})
			const ownerId = venue.owner.id
			this.accessControlService.checkOwnership(authUser, ownerId)
			await VenueScheduleItem.update(
				{
					id: scheduleId,
					venue: {
						id: venueId,
					},
				},
				{
					status: VenueScheduleItemStatusesEnum.APPROVED,
					approvedAt: new Date(),
				},
			)
		})
	}

	async declineScheduleItem(
		authUser: User,
		venueId: string,
		venueScheduleId: string,
	): Promise<void> {
		await this.dataSource.transaction(async (em) => {
			const venue = await em.getRepository(Venue).findOneOrFail({
				where: { id: venueId },
				relations: ['owner'],
			})
			const ownerId = venue.owner.id
			this.accessControlService.checkOwnership(authUser, ownerId)
			await VenueScheduleItem.update(
				{
					id: venueScheduleId,
					venue: {
						id: venueId,
					},
				},
				{
					status: VenueScheduleItemStatusesEnum.DECLINED,
					declinedAt: new Date(),
				},
			)
		})
	}

	async scheduleItemFindOneByOrFail(
		criteria: FindOptionsWhere<VenueScheduleItem>,
	): Promise<VenueScheduleItem> {
		return this.dataSource.transaction(async () => {
			const item = VenueScheduleItem.findOneBy(criteria)

			if (!item) {
				throw new HttpException(
					{
						message: 'VenueScheduleItem not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			return item
		})
	}
}
