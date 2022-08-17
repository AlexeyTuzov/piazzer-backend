import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    firstName: string;

    @Column()
    lastName: string;
}
