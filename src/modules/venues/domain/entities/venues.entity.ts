import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Coordinates } from '../types/coordinates'
import { User } from '../../../users/domain/entities/users.entity'
import { Tag } from '../../../tags/domain/entities/tags.entity'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { VenueScheduleItem } from './venueScheduleItem.entity'
import { AutoMap } from '@automapper/classes'
import CoordinatesResponseDto from '../../application/dto/response/coordinates.response.dto'

@Entity()
export class Venue extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column()
	title: string

	@AutoMap()
	@Column({ nullable: true })
	address: string

	@AutoMap()
	@Column({ type: 'uuid' })
	coverId: string

	@AutoMap(() => Resource)
	@OneToMany(() => Resource, (resource) => resource.venue, {
		cascade: true,
	})
	resources: Resource[]

	@AutoMap()
	@Column({ nullable: true })
	city: string

	@AutoMap()
	@Column()
	short: string

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@AutoMap(() => CoordinatesResponseDto)
	@Column({
		type: 'jsonb',
		default: {
			lat: 0,
			lon: 0,
		} as Coordinates,
	})
	coordinates: Coordinates

	@AutoMap(() => Communication)
	@OneToMany(() => Communication, (comm) => comm.venue, { cascade: ['insert'] })
	communications: Communication[]

	@OneToMany(() => Event, (event) => event.venue)
	events: Event[]

	@AutoMap()
	@Column({ nullable: true })
	contactPerson: string

	@AutoMap()
	@Column()
	description: string

	@AutoMap(() => Tag)
	@OneToMany(() => Tag, (tag) => tag.venueProperties, {
		cascade: true,
	})
	properties: Tag[]

	@AutoMap(() => Tag)
	@OneToMany(() => Tag, (tag) => tag.venueAttributes, {
		cascade: true,
	})
	attributes: Tag[]

	@AutoMap()
	@Column({ nullable: true })
	capacity: number

	@AutoMap()
	@Column({ nullable: true })
	cost: number

	@AutoMap()
	@Column({ default: false })
	isBlocked: boolean

	@AutoMap()
	@Column({ default: false })
	isDraft: boolean

	@AutoMap(() => User)
	@ManyToOne(() => User, (user) => user.venues)
	owner: User

	@AutoMap(() => VenueScheduleItem)
	@OneToMany(() => VenueScheduleItem, (scheduleItem) => scheduleItem.venue, {
		cascade: true,
	})
	scheduleItems: VenueScheduleItem[]
}
