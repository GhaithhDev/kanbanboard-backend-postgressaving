import { Column } from "src/column/column.object";
import { ColumnData } from "src/column/columnData"
import {v4 as uuid} from "uuid"

const template = [
    { columnName: "To do", cards: [], id: uuid() },
    { columnName: "Development", cards: [], id: uuid() },
    { columnName: "QA", cards: [], id: uuid() },
    { columnName: "Needs fixes", cards: [], id: uuid() },
    { columnName: "Production ready", cards: [], id: uuid() },
]

export const starterBoardData : ColumnData[] = template.map((column) => {
    return new ColumnData(column.id,column.columnName, column.cards);
});