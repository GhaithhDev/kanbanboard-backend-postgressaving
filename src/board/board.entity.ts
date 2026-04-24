import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; 

    @Column()
    ownerId!: string;

    @Column("text",{array: true, default: []})
    authorizedUserIds!: string[];

    @Column()
    colorNum!: number;

    constructor(id : string, name : string){
        this.id = id;
        this.name = name;
    }
}