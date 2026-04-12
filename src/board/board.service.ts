import { Inject, Injectable,forwardRef } from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';
import { CardService } from 'src/card/card.service';
import {v4 as uuid} from 'uuid';

import type { ColumnData } from 'src/column/columnData';
import { BoardData } from './boardData';
import { Board } from './board.object';
import { Column } from 'src/column/column.object';

@Injectable()
export class BoardService {
    
    private boards: Board[] = [];

    constructor(
        private columnService: ColumnService,
        @Inject(forwardRef( () => CardService ))
        private cardService: CardService
        ) {} // inject ColumnService and CardService to be members of this class

    private extractBoardData(board: Board): BoardData {
        const boardData : BoardData = {
            id: board.id,
            name: board.name,
            columns: this.columnService.getColumnsByBoardId(board.id).map( 
                (column : Column) => {
                   return this.columnService.extractColumnData(column);
                }
            )
        }
        return boardData;
    }
    
    public createBoard(boardName: string){
      
        const newBoard : Board = new Board(uuid(),boardName)

        const starterColumns : ColumnData[] = this.columnService.createStarterColumnsForBoard(newBoard.id);
        const boardData = new BoardData(
            newBoard.id,
            newBoard.name,
            starterColumns
        )
      
        this.boards.push(newBoard);
        return this.extractBoardData(newBoard);
    }

    // function to get board data by board id (will call ColumnService to get get all columns with board id)
    public getBoardDataById(boardId : string) : BoardData | undefined {
        for (const board of this.boards){
            if (board.id === boardId){
                return this.extractBoardData(board)
            }
        }
    }

    public getAllBoards() : BoardData[] | undefined{
        return this.boards.map( 
            (board) => {
                return this.extractBoardData(board)
            }
        )
    }
}
