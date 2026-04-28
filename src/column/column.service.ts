import { Injectable } from '@nestjs/common';

import { ColumnEntity } from './column.entity';
import { ColumnResponse } from './column-response';
import { ColumnRepository } from './column.repository';
import { CreateColumnDTO } from './create-column.dto';
import { CardRepository } from 'src/card/card.repository';
import { starterColumnNames } from 'src/board/starterColumns';

@Injectable()
export class ColumnService {
  constructor(
    private columnRepository: ColumnRepository,
    private cardRepository: CardRepository,
  ) {}

  // function to create a new column
  public async createColumn(
    createColumnDto: CreateColumnDTO,
  ): Promise<ColumnResponse[]> {
    const { boardId } = createColumnDto;

    const boardColumns: ColumnEntity[] =
      await this.columnRepository.getColumnsWithBoardId(boardId);
    const createdColumn: ColumnEntity =
      await this.columnRepository.createColumn(createColumnDto);

    boardColumns.push(createdColumn);

    return boardColumns.map(
      (column: ColumnEntity): ColumnResponse => ({
        id: column.id,
        title: column.name,
        parentBoardId: column.parentBoardId,
      }),
    );
  }

  public deleteColumn(columnId: string) {
    this.cardRepository.delete({ parentColumnId: columnId }); //delete related cards
    this.columnRepository.delete({ id: columnId });
  }

  public async getColumnsWithBoardId(
    boardId: string,
  ): Promise<ColumnResponse[]> {
    const columns: ColumnEntity[] =
      await this.columnRepository.getColumnsWithBoardId(boardId);
    const columnResponses: ColumnResponse[] = columns.map(
      (column: ColumnEntity) => {
        return {
          title: column.name,
          id: column.id,
          parentBoardId: column.parentBoardId,
        };
      },
    );
    return columnResponses;
  }

  /*public async getColumnById(columnId: string) : Promise<ColumnResponse>{
        return this.extractColumnData(await this.columnRepository.getColumnById(columnId));
    }
    
     public async extractColumnData(column: ColumnEntity) : Promise<ColumnResponse> {
        const columnData : ColumnResponse = {
            columnId: column.id,
            columnName: column.name,
            cards: await this.cardRepository.getCardsWithColumnId(column.id),
        }
        return columnData;
    }*/

  public createStarterColumnsForBoard(boardId: string): void {
    for (let i = 0; i < starterColumnNames.length; i++) {
      const columnName: string = starterColumnNames[i];
      this.createColumn({
        columnName: columnName,
        boardId: boardId,
      });
    }
  }
}
