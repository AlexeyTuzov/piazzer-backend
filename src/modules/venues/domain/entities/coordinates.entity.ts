import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coordinates {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'float'})
    lat: number;

    @Column({type: 'float'})
    lon: number;
}