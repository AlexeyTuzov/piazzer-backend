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
import { CommentEntityTypesEnum } from '../enums/commentEntityTypes.enum'
import { User } from '../../../users/domain/entities/users.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	content: string

	@Column({ type: 'enum', enum: CommentEntityTypesEnum })
	entityType: CommentEntityTypesEnum

	@Column({ type: 'uuid' })
	entityId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@ManyToOne(() => Comment)
	parent: Comment

	@Column({ nullable: true })
	parentId: string

	@OneToMany(() => Resource, (resource) => resource.comment)
	resources: Resource[]

	@ManyToOne(() => User, (user) => user.comments)
	creator: User
}
