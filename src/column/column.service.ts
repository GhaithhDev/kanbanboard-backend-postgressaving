import { Injectable } from '@nestjs/common';
import { starterBoardData } from 'src/board/starterBoardData';

import { ColumnEntity } from './column.entity';
import { ColumnResponse } from './column-response';
import { ColumnRepository } from './column.repository';
import { CreateColumnDTO } from './create-column.dto';
import { CardRepository } from 'src/card/card.repository';
import { GetColumnDTO } from './get-column.dto';


@Injectable()
export class ColumnService {

    constructor(
        private columnRepository: ColumnRepository,
        private cardRepository: CardRepository
    ) {}

    // function to create a new column
    public createColumn(createColumnDto : CreateColumnDTO) : Promise<ColumnEntity> {
       return this.columnRepository.createColumn(createColumnDto);
    }

    public deleteColumn(columnId: string){
        this.cardRepository.delete({parentColumnId: columnId}); //delete related cards
        this.columnRepository.delete({id: columnId});
    }

    public async extractColumnData(column: ColumnEntity) : Promise<ColumnResponse> {
        const columnData : ColumnResponse = {
            columnId: column.id,
            columnName: column.name,
            cards: await this.cardRepository.getCardsWithColumnId(column.id),
        }
        return columnData;
    }

    public async getColumnById(columnId: string) : Promise<ColumnResponse>{
        return this.extractColumnData(await this.columnRepository.getColumnById(columnId));
    }

    public createStarterColumnsForBoard(boardId : string) : void  {
        for (let i = 0; i < starterBoardData.length; i++) {
           this.createColumn({
                columnName: starterBoardData[i].columnName,
                boardId: boardId
            })
        }
    }

}
