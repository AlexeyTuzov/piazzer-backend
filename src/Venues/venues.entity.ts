import { User } from "src/Users/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venue {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(() => User, user => user.Venues)
    Owner: User;
}