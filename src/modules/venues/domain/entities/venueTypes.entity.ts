import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venue } from "./venues.entity";

@Entity()
export class VenueType {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @OneToMany(() => Venue, venue => venue.type)
    venues: Venue[];
}