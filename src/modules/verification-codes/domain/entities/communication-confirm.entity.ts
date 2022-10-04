import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'

@Entity()
export class CommunicationConfirm extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	code: string

	@Column()
	secret: string

	@Column({ default: false })
	used: boolean

	@ManyToOne(() => Communication, (communication) => communication.confirms)
	communication: Communication

	@CreateDateColumn()
	createdAt: Date

	@DeleteDateColumn()
	deletedAt: Date
}
