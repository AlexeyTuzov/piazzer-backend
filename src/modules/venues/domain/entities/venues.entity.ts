import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VenueType } from "./venueTypes.entity";
import { Resource } from "src/modules/resources/domain/entities/resources.entity";
import { VenueScheduleItem } from "./venueScheduleItem.entity";

@Entity()
export class Venue {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    name: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    address: string;

    @AutoMap()
    @Column({type: 'varchar'})
    town: string;

    @AutoMap()
    @Column({type: 'varchar'})
    email: string;

    @AutoMap()
    @Column({type: 'varchar'})
    contactPerson: string;

    @AutoMap()
    @Column({type: 'varchar'})
    phone: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    description: string;

    @AutoMap()
    @Column({ type: 'varchar', array: true })
    properties: string[];

    @AutoMap()
    @Column({ type: 'integer' })
    capacity: number;

    @AutoMap()
    @Column({ type: 'integer' })
    cost: number;

    @AutoMap()
    @Column({type: 'boolean'})
    isOutdoor: boolean;

    @AutoMap()
    @Column({type: 'boolean'})
    isFoodBeverage: boolean;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @AutoMap()
    @Column({type: 'boolean', default: false})
    isSaved: boolean;

    @AutoMap({type: () => Date})
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({type: () => Date})
    @UpdateDateColumn()
    updatedAt: string;

    @AutoMap({type: () => Date})
    @DeleteDateColumn({ type: 'date', default: null })
    deletedAt: string;

    @AutoMap(() => Resource)
    @OneToMany(() => Resource, resource => resource.belonging)
    resources: Resource [];

    @AutoMap(() => VenueType)
    @ManyToOne(() => VenueType, type => type.venues)
    type: VenueType;

    @AutoMap(() => VenueScheduleItem)
    @ManyToOne(() => VenueScheduleItem, scheduleItem => scheduleItem.venue)
    scheduleItems: VenueScheduleItem[];

    @AutoMap(() => User)
    @ManyToOne(() => User, user => user.venues)
    owner: User;
    
}
