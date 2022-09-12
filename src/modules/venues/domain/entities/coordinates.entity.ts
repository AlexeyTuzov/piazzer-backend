import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coordinates extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({type: 'float'})
    lat: number;

    @AutoMap()
    @Column({type: 'float'})
    lon: number;
}