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

@Entity()
export class Resource extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	size: number

	@Column({
		type: 'enum',
		enum: FileTypesEnum,
	})
	type: FileTypesEnum

	@Column({ nullable: true })
	link: string

	@Column()
	creatorId: string

	@Column()
	mimeType: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

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
