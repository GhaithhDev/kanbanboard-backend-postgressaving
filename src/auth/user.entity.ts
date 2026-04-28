import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique: true})
    username!: string;

    @Column()
    password!: string;

    @Column({ default: () => "floor(random() * 6) + 1", type: "int" })
    userColorNum!: number;

}