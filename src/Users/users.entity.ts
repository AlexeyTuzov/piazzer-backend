import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRoles from './DTO/user-roles';
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

    @OneToMany(() => Venue, venue => venue.Owner)
    Venues: Venue[];

    @OneToMany(() => Meeting, meeting => meeting.Organiser)
    Meetings: Meeting[];
}
