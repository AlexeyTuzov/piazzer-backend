import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({type: 'varchar'})
    label: string;

    @AutoMap()
    @Column({type: 'varchar'})
    value: string;

    @AutoMap()
    @Column({type: 'varchar'})
    description: string;

    @AutoMap()
    @Column({type: 'varchar'})
    avatarId: string;

    @AutoMap()
    @Column({type: 'varchar'})
    color: string;

    @AutoMap()
    @Column({type: 'varchar'})
    type: string;

    @AutoMap({ type: () => Date })
    @CreateDateColumn()
    createdAt: string;

    @AutoMap({ type: () => Date })
    @UpdateDateColumn()
    updatedAt: string;
}