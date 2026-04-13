import { Card } from "src/card/card.entity";

export class ColumnData {
    columnId : string;
    columnName : string;
    cards : Card[];

    constructor(columnId: string,columnName: string, cards: Card[]) {
        this.columnName = columnName;
        this.cards = cards;
        this.columnId = columnId
    }
}