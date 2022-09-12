import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";
import ResourceTypes from "../enums/resourceTypes";
import { Venue } from "src/modules/venues/domain/entities/venues.entity";
import { Event } from "src/modules/events/events.entity";

@Entity()
export class Resource extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    name: string;

    @AutoMap()
    @Column({ type: 'integer', nullable: true })
    size: number;

    @AutoMap()
    @Column({ type: 'varchar' })
    type: ResourceTypes;

    @AutoMap()
    @Column({ type: 'varchar' })
    link: string;

    @AutoMap()
    @Column({type: 'varchar'})
    creatorId: string;

    @AutoMap()
    @Column({type: 'varchar'})
    mimeType: string;

    @AutoMap({ type: () => Date })
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({ type: () => Date })
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap({ type: () => Date })
    @DeleteDateColumn({ type: 'date', default: null })
    deletedAt: string;

    //Is this approach ever valid? Maybe more logical is to divide into a two different relations
    @AutoMap(() => Venue || Event)
    @ManyToOne(() => Venue || Event, belonging => belonging.resources)
    belonging: Venue | Event;
}