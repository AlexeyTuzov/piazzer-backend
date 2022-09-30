import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { TagTypesEnum } from '../enums/tagTypes.enum'
import { Venue } from '../../../venues/domain/entities/venues.entity'

@Entity()
export class Tag extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: false })
	label: string

	@Column({ nullable: true })
	value: string

	@Column()
	description: string

	@Column({ type: 'uuid', nullable: true })
	avatarId: string

	@Column({ nullable: true })
	color: string

	@Column({
		type: 'enum',
		enum: TagTypesEnum,
		default: TagTypesEnum.TAG,
	})
	type: TagTypesEnum

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@ManyToOne(() => Venue, (venue) => venue.properties)
	venueProperties: Venue

	@ManyToOne(() => Venue, (venue) => venue.attributes)
	venueAttributes: Venue
}
