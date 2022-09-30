import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Coordinates } from '../types/coordinates'
import { User } from '../../../users/domain/entities/users.entity'
import { Tag } from '../../../tags/domain/entities/tags.entity'
import { Communication } from '../../../users/domain/entities/communications.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { VenueScheduleItem } from './venueScheduleItem.entity'

@Entity()
export class Venue extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column({ nullable: true })
	address: string

	@Column({ type: 'uuid' })
	coverId: string

	@OneToMany(() => Resource, (resource) => resource.venue, {
		cascade: true,
		onDelete: 'NO ACTION',
	})
	resources: Resource[]

	@Column({ nullable: true })
	city: string

	@Column()
	short: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column({
		type: 'jsonb',
		default: {
			lat: 0,
			lon: 0,
		} as Coordinates,
	})
	coordinates: Coordinates

	@OneToMany(() => Communication, (comm) => comm.venue, { cascade: true })
	communications: Communication[]

	@OneToMany(() => Event, (event) => event.venue, { cascade: true })
	events: Event[]

	@Column({ nullable: true })
	contactPerson: string

	@Column()
	description: string

	@OneToMany(() => Tag, (tag) => tag.venueProperties, {
		cascade: true,
		onDelete: 'NO ACTION',
	})
	properties: Tag[]

	@OneToMany(() => Tag, (tag) => tag.venueAttributes, {
		cascade: true,
		onDelete: 'NO ACTION',
	})
	attributes: Tag[]

	@Column({ nullable: true })
	capacity: number

	@Column({ nullable: true })
	cost: number

	@Column({ default: false })
	isBlocked: boolean

	@Column({ default: false })
	isDraft: boolean

	@ManyToOne(() => User, (user) => user.venues)
	owner: User

	@ManyToOne(() => VenueScheduleItem, (scheduleItem) => scheduleItem.venue, {
		cascade: true,
	})
	scheduleItems: VenueScheduleItem[]
}
