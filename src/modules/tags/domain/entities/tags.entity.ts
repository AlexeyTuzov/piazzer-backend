import { AutoMap } from "@automapper/classes";
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, ManyToOne
} from 'typeorm';
import { Venue } from '../../../venues/domain/entities/venues.entity';
import { Event } from '../../../events/domain/entities/events.entity';
import TagTypes from '../enums/tag-types';

@Entity()
export class Tag extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({type: 'varchar'})
    label: string;

    @AutoMap()
    @Column({type: 'varchar'})
    value: string;

    @AutoMap()
    @Column({type: 'varchar'})
    description: string;

    @AutoMap()
    @Column({type: 'varchar'})
    avatarId: string;

    @AutoMap()
    @Column({type: 'varchar'})
    color: string;

    @AutoMap({ type: () => String})
    @Column({type: 'enum', enum: TagTypes})
    type: TagTypes;

    @AutoMap({ type: () => Date })
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({ type: () => Date })
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap({type: () => Date})
    @DeleteDateColumn()
    deletedAt: string;

    @AutoMap(() => Venue || Event)
    @ManyToOne(() => Venue || Event, belonging => belonging.tags)
    belonging: Venue | Event;
}
