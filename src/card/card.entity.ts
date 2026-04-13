import { Priority } from "src/enums/priority";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    priority!: Priority;

    @Column({nullable: true})
    description?: string;

    /*@Column()
    columnId!: string*/
}