import { User } from "src/Users/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'blob' })
    image: string;

    @Column({ type: 'array' })
    atributes: string[];

    @Column({ type: 'datetime' })
    dateTime: string;

    @Column({ type: 'varchar' })
    duration: string;

    @Column({ type: 'integer' })
    numberOfParticipants: number;

    @Column({ type: 'array' })
    properties: string[];

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'boolean' })
    isBooked: boolean;

    @Column({ type: 'boolean' })
    isPublished: boolean;

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @Column({ type: 'datetime', default: null })
    deletedAt: string;

    @ManyToMany(() => User, user => user.MeetingsToVisit,
        { cascade: true })
    Participants: User[];

    @ManyToOne(() => User, user => user.OwnMeetings)
    Organiser: User;
}