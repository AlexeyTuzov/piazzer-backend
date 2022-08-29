import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRoles from './Enums/user-roles';
import { Venue } from 'src/Venues/venues.entity';
import { Meeting } from 'src/Meetings/meetings.entity';

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

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.PARTICIPANT })
    role: UserRoles;

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @Column({ type: 'datetime', default: null })
    deletedAt: string;

    @OneToMany(() => Venue, venue => venue.Owner)
    Venues: Venue[];

    @OneToMany(() => Meeting, meeting => meeting.Organiser)
    OwnMeetings: Meeting[];

    @ManyToMany(() => Meeting, meeting => meeting.Participants, {})
    @JoinTable()
    MeetingsToVisit: Meeting[];
}
