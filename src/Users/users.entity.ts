import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRoles from './Enums/user-roles';
import { Venue } from 'src/Venues/venues.entity';
import { Event } from 'src/Events/events.entity';
import { Communication } from 'src/Communications/Communications.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.PARTICIPANT })
    role: UserRoles;

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @Column({ type: 'datetime', default: null })
    deletedAt: string;

    @OneToMany(() => Communication, comm => comm.User)
    Communications: Communication[];

    @OneToMany(() => Venue, venue => venue.Owner)
    Venues: Venue[];

    @OneToMany(() => Event, event => event.Organiser)
    OwnMeetings: Event[];

    @ManyToMany(() => Event, event => event.Participants, {})
    @JoinTable()
    EventsToVisit: Event[];
}
