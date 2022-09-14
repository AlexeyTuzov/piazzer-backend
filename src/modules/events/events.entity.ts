import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import { Resource } from "../resources/domain/entities/resources.entity";
import { VenueScheduleItem } from "../venues/domain/entities/venueScheduleItem.entity";

@Entity()
export class Event {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    title: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    description: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable:true })
    duration: string;

    @AutoMap()
    @Column({ type: 'integer', default: 0 })
    numberOfParticipants: number;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    email: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBooked: boolean;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isPublished: boolean;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @AutoMap({ type: () => Date })
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({ type: () => Date })
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap({ type: () => Date })
    @DeleteDateColumn({ type: 'date', default: null })
    deletedAt: string;

    @AutoMap(() => Resource)
    @OneToMany(() => Resource, resource => resource.belonging)
    resources: Resource[];

    @AutoMap(() => VenueScheduleItem)
    @OneToOne(() => VenueScheduleItem, scheduleItem => scheduleItem.event)
    scheduleItem: VenueScheduleItem;

    /*
    @ManyToMany(() => User, user => user.EventsToVisit,
        { cascade: true })
    Participants: User[];

    @ManyToOne(() => User, user => user.OwnMeetings)
    Organiser: User;
    */
}
