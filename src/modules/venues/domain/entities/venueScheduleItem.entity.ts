import { AutoMap } from "@automapper/classes";
import { Event } from '../../../events/domain/entities/events.entity'
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import VenueScheduleItemStatuses from "../enums/venueScheduleItemStatuses";
import { Venue } from "./venues.entity";

@Entity()
export class VenueScheduleItem extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({type: 'date'})
    date: string;

    @AutoMap()
    @Column({type: 'time'})
    startTime: string;

    @AutoMap()
    @Column({type: 'time'})
    endTime: string;

    @AutoMap()
    @Column({type: 'time with time zone'})
    declinedAt: string;

    @AutoMap()
    @Column({type: 'time with time zone'})
    approvedAt: string;

    @AutoMap()
    @Column({type: 'time with time zone'})
    confirmedAt: string;

    @AutoMap()
    @Column({type: 'time with time zone'})
    canceledAt: string;

    @AutoMap({type: () => String})
    @Column({type: 'enum', enum: VenueScheduleItemStatuses })
    status: VenueScheduleItemStatuses;

    @AutoMap({ type: () => Date })
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({ type: () => Date })
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap(() => Venue)
    @OneToMany(() => Venue, venue => venue.scheduleItems)
    venue: Venue;

    @AutoMap(() => Event)
    @OneToOne(() => Event, event => event.scheduleItem)
    event: Event;
}