import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string; 

    @Column()
    parentBoardId!: string;
}