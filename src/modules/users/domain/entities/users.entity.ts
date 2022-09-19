import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import UserTypes from '../enums/user-types';
import { Venue } from '../../../venues/domain/entities/venues.entity';
import { Event } from 'src/modules/events/domain/entities/events.entity';
import { Communication } from '../../../communications/domain/entities/communications.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //TODO: NO Email! Need to store it in communications, use any confirmed email to log in!
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
    @Column({ type: 'enum', enum: UserTypes, default: UserTypes.USER })
    role: UserTypes;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    //TODO: change this to default:false - temporary set to true to aviod email approvement!!!
    @AutoMap()
    @Column({type: 'boolean', default: true})
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
    @OneToMany(() => Communication, comm => comm.user, {cascade: true})
    communications: Communication[];

    @AutoMap({type: () => Venue})
    @OneToMany(() => Venue, venue => venue.owner, {cascade: true})
    venues: Venue[];
    /*
    @OneToMany(() => Event, event => event.Organiser)
    OwnMeetings: Event[];

    @ManyToMany(() => Event, event => event.Participants, {})
    @JoinTable()
    EventsToVisit: Event[];
    */
}
