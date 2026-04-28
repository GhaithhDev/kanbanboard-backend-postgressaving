import { Priority } from "src/enums/priority";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column()
    priority!: Priority;

    @Column()
    description!: string;

    @Column()
    parentColumnId!: string

    @Column({nullable: true})
    externalWorker?: string
}