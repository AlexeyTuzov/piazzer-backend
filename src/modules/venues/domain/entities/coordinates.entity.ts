import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coordinates {

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