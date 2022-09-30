import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
} from 'typeorm'
import { User } from '../../../users/domain/entities/users.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { Communication } from '../../../users/domain/entities/communications.entity'
import { Venue } from '../../../venues/domain/entities/venues.entity'
import { VenueScheduleItem } from '../../../venues/domain/entities/venueScheduleItem.entity'

@Entity()
export class Event extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ default: false })
	isDraft: boolean

	@Column()
	title: string

	@Column({ type: 'uuid' })
	coverId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column()
	description: string

	@ManyToOne(() => User, (user) => user.events)
	organizer: User

	@OneToMany(() => Resource, (resource) => resource.event)
	resources: Resource[]

	@OneToMany(() => Communication, (communication) => communication.event)
	communications: Communication[]

	@ManyToOne(() => Venue, (venue) => venue.events)
	venue: Venue

	@OneToOne(() => VenueScheduleItem, (scheduleItem) => scheduleItem.event)
	scheduleItem: VenueScheduleItem
}
