import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRoles from '../enums/user-roles';
import { Venue } from 'src/modules/venues/venues.entity';
import { Event } from 'src/modules/events/events.entity';
import { Communication } from 'src/modules/communications/domain/entities/Communications.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    email: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    password: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    name: string;

    @AutoMap({ type: () => String})
    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.PARTICIPANT })
    role: UserRoles;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @AutoMap({type: () => Date})
    @Column({ type: 'date', default: null })
    deletedAt: string;

    @AutoMap({type: () => Communication})
    @OneToMany(() => Communication, comm => comm.User)
    Communications: Communication[];

    /*
    @OneToMany(() => Venue, venue => venue.Owner)
    Venues: Venue[];

    @OneToMany(() => Event, event => event.Organiser)
    OwnMeetings: Event[];

    @ManyToMany(() => Event, event => event.Participants, {})
    @JoinTable()
    EventsToVisit: Event[];
    */
}
