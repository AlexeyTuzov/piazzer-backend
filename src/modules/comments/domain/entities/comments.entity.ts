import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { CommentEntityTypesEnum } from '../enums/commentEntityTypes.enum'
import { User } from '../../../users/domain/entities/users.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { AutoMap } from '@automapper/classes'

@Entity()
export class Comment extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column()
	content: string

	@AutoMap()
	@Column({ type: 'enum', enum: CommentEntityTypesEnum })
	entityType: CommentEntityTypesEnum

	@AutoMap()
	@Column({ type: 'uuid' })
	entityId: string

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@ManyToOne(() => Comment)
	parent: Comment

	@AutoMap()
	@Column({ nullable: true })
	parentId: string

	@AutoMap(() => Resource)
	@OneToMany(() => Resource, (resource) => resource.comment)
	resources: Resource[]

	@AutoMap(() => User)
	@ManyToOne(() => User, (user) => user.comments)
	creator: User
}
