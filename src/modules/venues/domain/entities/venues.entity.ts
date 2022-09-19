import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VenueType } from "./venueTypes.entity";
import { Resource } from "src/modules/resources/domain/entities/resources.entity";
import { VenueScheduleItem } from "./venueScheduleItem.entity";
import { Communication } from "src/modules/communications/domain/entities/communications.entity";
import { Tag } from '../../../tags/domain/entities/tags.entity';
import { Coordinates } from "./coordinates.entity";

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
    contactPerson: string;

    @AutoMap()
    @Column({type: 'varchar', nullable: true})
    coverId: string;

    @AutoMap()
    @Column({type: 'varchar', nullable: true})
    short: string;

    @AutoMap()
    @Column({ type: 'varchar', nullable: true })
    description: string;

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

    @AutoMap(() => Coordinates)
    @OneToOne(() => Coordinates, coordinates => coordinates.venue, {cascade: true})
    coordinates: Coordinates;

    @AutoMap(() => Resource)
    @OneToMany(() => Resource, resource => resource.venue, {cascade: true})
    resources: Resource [];

    @AutoMap(() => Communication)
    @OneToMany(() => Communication, comm => comm.venue, {cascade: true})
    communications: Communication[];

    @AutoMap(() => VenueType)
    @ManyToOne(() => VenueType, type => type.venues)
    type: VenueType;

    @AutoMap(() => VenueScheduleItem)
    @ManyToOne(() => VenueScheduleItem, scheduleItem => scheduleItem.venue, {cascade: true})
    scheduleItems: VenueScheduleItem[];

    @AutoMap(() => User)
    @ManyToOne(() => User, user => user.venues)
    owner: User;

    @AutoMap(() => Tag)
    @OneToMany(() => Tag, tag => tag.venueAttribute, {cascade: true})
    attributes: Tag[];

    @AutoMap(() => Tag)
    @OneToMany(() => Tag, tag => tag.venueProperty, {cascade: true})
    properties: Tag[];
}
