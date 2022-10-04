import { Event } from '../../../events/domain/entities/events.entity'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Venue } from './venues.entity'
import { VenueScheduleItemStatusesEnum } from '../enums/venueScheduleItemStatuses.enum'
import { AutoMap } from '@automapper/classes'

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

	@AutoMap(() => Venue)
	@ManyToOne(() => Venue, (venue) => venue.scheduleItems)
	venue: Venue

	@AutoMap()
	@Column()
	venueId: string

	@AutoMap(() => Event)
	@ManyToOne(() => Event, (event) => event.scheduleItem)
	event: Event

	@AutoMap()
	@Column()
	eventId: string

	@AutoMap(() => Date)
	@Column()
	declinedAt: Date

	@AutoMap(() => Date)
	@Column()
	approvedAt: Date

	@AutoMap()
	@Column()
	confirmedAt: Date

	@AutoMap()
	@Column()
	canceledAt: Date

	@AutoMap()
	@Column({
		type: 'enum',
		enum: VenueScheduleItemStatusesEnum,
		default: VenueScheduleItemStatusesEnum.CREATED,
	})
	status: VenueScheduleItemStatusesEnum

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date
}
