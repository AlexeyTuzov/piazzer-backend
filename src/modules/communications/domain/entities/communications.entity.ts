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
import { CommunicationTypesEnum } from '../../../communications/domain/enums/communicationTypes.enum'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { Venue } from '../../../venues/domain/entities/venues.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { CommunicationConfirm } from '../../../verification-codes/domain/entities/communication-confirm.entity'
import { AutoMap } from '@automapper/classes'

@Entity()
export class Communication extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({
		type: 'enum',
		enum: CommunicationTypesEnum,
	})
	@AutoMap()
	type: CommunicationTypesEnum

	@AutoMap()
	@Column({ nullable: false })
	value: string

	@AutoMap()
	@Column({ nullable: true })
	description: string

	@AutoMap()
	@Column({ default: false })
	confirmed: boolean

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(() => User, (user) => user.communications)
	user: User

	@ManyToOne(() => Venue, (venue) => venue.communications)
	venue: Venue

	@ManyToOne(() => Event, (event) => event.communications)
	event: Event

	@OneToMany(() => CommunicationConfirm, (confirm) => confirm.communication)
	confirms: CommunicationConfirm[]
}
