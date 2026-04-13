import { Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { starterBoardData } from 'src/board/starterBoardData';
import { CardService } from 'src/card/card.service';

import type { Column } from './column.object';
import type { ColumnData } from './columnData';

@Injectable()
export class ColumnService {

    /*private columns : Column[] = []

    constructor(private cardService : CardService) {}

    // function to create a new column
    public createColumn(columnName : string, boardId : string) : Column {
        const column : Column = {
            id: uuid(),
            name: columnName,
            parentBoardId: boardId
        }
        this.columns.push(column)
        return column
    }

    public extractColumnData(column: Column) : ColumnData {
        const columnData : ColumnData = {
            columnId: column.id,
            columnName: column.name,
            cards: this.cardService.getCardsByColumnId(column.id),
        }
        return columnData;
    }

    public createStarterColumnsForBoard(boardId : string) : ColumnData[]  {
        
        for (let i = 0; i < starterBoardData.length; i++) {
            this.createColumn(starterBoardData[i].columnName,boardId)
        }
        return starterBoardData
    }

    public getAllColumns(){
        return [...this.columns];
    }

    public getColumnsByBoardId(boardId : string) : Column[] {
        return this.columns.filter((column) => column.parentBoardId === boardId);
    }*/
}
