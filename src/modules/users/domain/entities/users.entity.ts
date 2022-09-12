import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import UserRoles from '../enums/user-roles';
import { Venue } from '../../../venues/domain/entities/venues.entity';
import { Event } from 'src/modules/events/events.entity';
import { Communication } from './communications.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User extends BaseEntity {

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
    @Column({ type: 'varchar' })
    position: string;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @AutoMap()
    @Column({type: 'boolean', default: false})
    isVerified: boolean;

    @AutoMap({type: () => Date})
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({type: () => Date})
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap({type: () => Date})
    @DeleteDateColumn({ type: 'date', default: null })
    deletedAt: string;

    @AutoMap({type: () => Communication})
    @OneToMany(() => Communication, comm => comm.user)
    communications: Communication[];

    @AutoMap({type: () => Venue})
    @OneToMany(() => Venue, venue => venue.owner)
    venues: Venue[];
    /*
    @OneToMany(() => Event, event => event.Organiser)
    OwnMeetings: Event[];

    @ManyToMany(() => Event, event => event.Participants, {})
    @JoinTable()
    EventsToVisit: Event[];
    */
}
