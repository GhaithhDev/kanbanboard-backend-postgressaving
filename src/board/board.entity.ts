import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; 
    
    ownerId!: string;
    authorizedUsers!: string[];

    constructor(id : string, name : string){
        this.id = id;
        this.name = name;
    }
}