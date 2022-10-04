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
	JoinColumn,
} from 'typeorm'
import { User } from '../../../users/domain/entities/users.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { Communication } from '../../../users/domain/entities/communications.entity'
import { Venue } from '../../../venues/domain/entities/venues.entity'
import { VenueScheduleItem } from '../../../venues/domain/entities/venueScheduleItem.entity'
import { AutoMap } from '@automapper/classes'

@Entity()
export class Event extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column({ default: false })
	isDraft: boolean

	@AutoMap()
	@Column()
	title: string

	@AutoMap()
	@Column({ type: 'uuid' })
	coverId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column()
	description: string

	@AutoMap(() => User)
	@ManyToOne(() => User, (user) => user.events)
	organizer: User

	@OneToMany(() => Resource, (resource) => resource.event)
	resources: Resource[]

	@OneToMany(() => Communication, (communication) => communication.event)
	communications: Communication[]

	@ManyToOne(() => Venue, (venue) => venue.events)
	venue: Venue

	@OneToMany(() => VenueScheduleItem, (scheduleItem) => scheduleItem.event, {
		cascade: true,
	})
	scheduleItem: VenueScheduleItem[]
}
