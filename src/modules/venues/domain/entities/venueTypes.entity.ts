import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venue } from "./venues.entity";

@Entity()
export class VenueType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Venue, venue => venue.type)
    venues: Venue[];
}