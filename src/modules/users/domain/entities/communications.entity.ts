import { AutoMap } from "@automapper/classes";
import { User } from "src/modules/users/domain/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import CommTypes from "../enums/comm-types";

@Entity()
export class Communication extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ type: 'enum', enum: CommTypes })
    type: CommTypes;

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

    @ManyToOne(() => User, user => user.communications)
    user: User;
}
