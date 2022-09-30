import { AutoMap } from '@automapper/classes'
import { Event } from '../../../events/domain/entities/events.entity'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Venue } from './venues.entity'
import { VenueScheduleItemStatusesEnum } from '../enums/venueScheduleItemStatuses.enum'

@Entity()
export class VenueScheduleItem extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column()
	date: Date

	@AutoMap()
	@Column('time')
	startTime: Date

	@AutoMap()
	@Column('time')
	endTime: Date

	@AutoMap()
	@Column()
	declinedAt: Date

	@AutoMap()
	@Column()
	approvedAt: Date

	@AutoMap()
	@Column()
	confirmedAt: Date

	@AutoMap()
	@Column()
	canceledAt: Date

	@AutoMap({ type: () => String })
	@Column({ type: 'enum', enum: VenueScheduleItemStatusesEnum })
	status: VenueScheduleItemStatusesEnum

	@AutoMap({ type: () => Date })
	@CreateDateColumn()
	createdAt: Date

	@AutoMap({ type: () => Date })
	@UpdateDateColumn()
	updatedAt: Date

	@AutoMap(() => Venue)
	@OneToMany(() => Venue, (venue) => venue.scheduleItems)
	venue: Venue

	@AutoMap(() => Event)
	@OneToOne(() => Event, (event) => event.scheduleItem)
	event: Event
}
