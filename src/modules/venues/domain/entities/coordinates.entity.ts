import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Venue } from "./venues.entity";

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

    @AutoMap(() => Venue)
    @OneToOne(() => Venue, venue => venue.coordinates)
    venue: Venue;
}