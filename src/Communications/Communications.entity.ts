import { User } from "src/Users/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import CommTypes from "./Enums/comm-types";

@Entity()
export class Communication {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: CommTypes })
    type: CommTypes;

    @Column({ type: 'varchar' })
    value: string;

    @Column({ type: 'boolean', default: false })
    confirmed: boolean;

    @ManyToOne(() => User, user => user.Communications)
    User: User;
}