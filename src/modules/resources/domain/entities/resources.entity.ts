import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";
import ResourceTypes from "../enums/resourceTypes";
import { Venue } from "src/modules/venues/domain/entities/venues.entity";
import { Event } from "src/modules/events/domain/entities/events.entity"; 

@Entity()
export class Resource extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    name: string;

    @AutoMap()
    @Column({ type: 'integer', nullable: true })
    size: number;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    type: ResourceTypes;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    link: string;

    @AutoMap()
    @Column({type: 'varchar', nullable: true})
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

    @AutoMap(() => Venue)
    @ManyToOne(() => Venue, venue => venue.resources)
    venue: Venue;

    @AutoMap(() => Event)
    @ManyToOne(() => Event, event => event.resources)
    event: Event;
}