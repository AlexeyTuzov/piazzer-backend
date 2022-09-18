import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { Venue } from "src/modules/venues/domain/entities/venues.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import CommunicationsTypes from "../enums/comm-types";

@Entity()
export class Communication extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'enum', enum: CommunicationsTypes })
    type: CommunicationsTypes;

    @AutoMap()
    @Column({ type: 'varchar' })
    value: string;

    @AutoMap()
    @Column({ type: 'boolean', default: false })
    confirmed: boolean;

    @AutoMap({type: () => Date})
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({type: () => Date})
    @UpdateDateColumn()
    updatedAt: string;
    
    @AutoMap({type: () => Date})
    @DeleteDateColumn({ type: 'date', default: null })
    deletedAt: string;

    @AutoMap(() => User || Venue)
    @ManyToOne(() => User || Venue, belonging => belonging.communications)
    belonging: User;
}
