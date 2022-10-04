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
import { FileTypesEnum } from '../enums/fileTypes.enum'
import { User } from '../../../users/domain/entities/users.entity'
import { Venue } from '../../../venues/domain/entities/venues.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { Comment } from '../../../comments/domain/entities/comments.entity'
import { AutoMap } from '@automapper/classes'

@Entity()
export class Resource extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column()
	name: string

	@AutoMap()
	@Column()
	size: number

	@AutoMap()
	@Column({
		type: 'enum',
		enum: FileTypesEnum,
	})
	type: FileTypesEnum

	@AutoMap()
	@Column({ nullable: true })
	link: string

	@AutoMap()
	@Column()
	creatorId: string

	@AutoMap()
	@Column()
	mimeType: string

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date

	@AutoMap()
	@DeleteDateColumn()
	deletedAt: Date

	@ManyToOne(() => User, (user) => user.resources)
	creator: User

	@ManyToOne(() => Venue, (venue) => venue.resources)
	venue: Venue

	@ManyToOne(() => Event, (venue) => venue.resources)
	event: Event

	@ManyToOne(() => Comment, (comment) => comment.resources)
	comment: Comment
}
