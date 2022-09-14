import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VenueType } from "./venueTypes.entity";
import { Resource } from "src/modules/resources/domain/entities/resources.entity";
import { VenueScheduleItem } from "./venueScheduleItem.entity";

@Entity()
export class Venue extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    title: string;

    @AutoMap()
    @Column({ type: 'varchar' })
    address: string;

    @AutoMap()
    @Column({type: 'varchar'})
    city: string;

    @AutoMap()
    @Column({type: 'varchar'})
    email: string;

    @AutoMap()
    @Column({type: 'varchar'})
    contactPerson: string;

    @AutoMap()
    @Column({type: 'varchar'})
    telephone: string;

    @AutoMap()
    @Column({type: 'varchar', nullable: true})
    short: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    description: string;

    @AutoMap()
    @Column({ type: 'varchar', array: true, nullable: true })
    properties: string[];

    @AutoMap()
    @Column({ type: 'integer', default: 0 })
    capacity: number;

    @AutoMap()
    @Column({ type: 'integer', default: 0 })
    cost: number;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @AutoMap()
    @Column({type: 'boolean', default: false})
    isDraft: boolean;

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
    @OneToMany(() => Resource, resource => resource.belonging, {cascade: true})
    resources: Resource [];

    @AutoMap(() => VenueType)
    @ManyToOne(() => VenueType, type => type.venues)
    type: VenueType;

    @AutoMap(() => VenueScheduleItem)
    @ManyToOne(() => VenueScheduleItem, scheduleItem => scheduleItem.venue, {cascade: true})
    scheduleItems: VenueScheduleItem[];

    @AutoMap(() => User)
    @ManyToOne(() => User, user => user.venues)
    owner: User;

}
