export class Board {
    id: string;
    name: string; 
    //will add another property for user ids that has access to this board

    constructor(id : string, name : string){
        this.id = id;
        this.name = name;
    }
}