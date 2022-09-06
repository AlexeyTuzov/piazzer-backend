import { User } from "src/modules/users/domain/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venue {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'array' })
    rules: string[];

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'blob' })
    photos: string[];

    @Column({ type: 'integer' })
    capacity: number;

    //TODO: Check up how availability is meant to be stored - enum, string[] or smthng
    @Column({ type: 'varchar' })
    availability: string;

    @Column({ type: 'array' })
    links: string[];

    @Column({ type: 'array' })
    costs: string[];

    @Column({ type: 'array' })
    amenities: string[];

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @Column({ type: 'datetime', default: null })
    deletedAt: string;

    @ManyToOne(() => User, user => user.Venues)
    Owner: User;
}
