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
import { AutoMap } from '@automapper/classes'

@Entity()
export class Tag extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column({ nullable: false })
	label: string

	@AutoMap()
	@Column({ nullable: true })
	value: string

	@AutoMap()
	@Column()
	description: string

	@AutoMap()
	@Column({ type: 'uuid', nullable: true })
	avatarId: string

	@AutoMap()
	@Column({ nullable: true })
	color: string

	@AutoMap()
	@Column({
		type: 'enum',
		enum: TagTypesEnum,
		default: TagTypesEnum.TAG,
	})
	type: TagTypesEnum

	@AutoMap(() => Date)
	@CreateDateColumn()
	createdAt: Date

	@AutoMap(() => Date)
	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@ManyToOne(() => Venue, (venue) => venue.properties)
	venueProperties: Venue

	@ManyToOne(() => Venue, (venue) => venue.attributes)
	venueAttributes: Venue
}
