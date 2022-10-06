import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { UserRolesEnum } from '../enums/userRoles.enum'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'
import { createHash } from 'crypto'
import { Venue } from '../../../venues/domain/entities/venues.entity'
import { Event } from '../../../events/domain/entities/events.entity'
import { Comment } from '../../../comments/domain/entities/comments.entity'
import { Resource } from '../../../resources/domain/entities/resources.entity'
import { AutoMap } from '@automapper/classes'

@Entity()
export class User extends BaseEntity {
	@AutoMap()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@AutoMap()
	@Column({
		type: 'enum',
		enum: UserRolesEnum,
		default: UserRolesEnum.USER,
	})
	role: UserRolesEnum

	@AutoMap()
	@Column()
	name: string

	@AutoMap()
	@Column({ default: false })
	verified: boolean

	@AutoMap()
	@Column({ default: false })
	blocked: boolean

	@Column()
	password: string

	@AutoMap()
	@CreateDateColumn()
	createdAt: Date

	@AutoMap()
	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date

	@AutoMap(() => Communication)
	@OneToMany(() => Communication, (communication) => communication.user, {
		cascade: true,
	})
	communications: Communication[]

	@OneToMany(() => Event, (event) => event.organizer, { cascade: true })
	events: Event[]

	@OneToMany(() => Venue, (venue) => venue.owner, { cascade: true })
	venues: Venue[]

	@OneToMany(() => Comment, (comment) => comment.creator, { cascade: true })
	comments: Comment[]

	@OneToMany(() => Resource, (resource) => resource.creator, { cascade: true })
	resources: Resource[]

	private oldPassword: string

	@BeforeInsert()
	@BeforeUpdate()
	private updatePassword() {
		if (this.password && this.password !== this.oldPassword) {
			this.password = User.hashPassword(this.password)
		}
	}

	public static hashPassword(plainText: string): string {
		const sha = createHash('sha256').update(plainText)

		return createHash('md5').update(sha.digest()).digest('hex')
	}

	isAdmin() {
		return this.role === UserRolesEnum.ADMIN
	}
}
