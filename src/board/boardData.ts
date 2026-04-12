import type { ColumnData } from "src/column/columnData";

export class BoardData {
    id: string;
    name: string;
    columns: ColumnData[];

    constructor(id, name , columns){
        this.id = id;
        this.name = name;
        this.columns = columns
    }
}