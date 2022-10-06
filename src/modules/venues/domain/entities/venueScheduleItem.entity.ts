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
	@Column({ nullable: true })
	declinedAt: Date

	@AutoMap(() => Date)
	@Column({ nullable: true })
	approvedAt: Date

	@AutoMap()
	@Column({ nullable: true })
	confirmedAt: Date

	@AutoMap()
	@Column({ nullable: true })
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
