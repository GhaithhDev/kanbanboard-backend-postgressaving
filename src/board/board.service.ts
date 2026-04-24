import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';

import { BoardResponse } from './board.response';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './create.board.dto';
import { ColumnRepository } from 'src/column/column.repository';
import { ColumnEntity } from 'src/column/column.entity';
import { User } from 'src/auth/user.entity';
import { BoardCardResponse } from './board-card.response';
import { CardRepository } from 'src/card/card.repository';
import { Card } from 'src/card/card.entity';
import { CardModule } from 'src/card/card.module';

@Injectable()
export class BoardService {
  constructor(
    private columnService: ColumnService,
    private boardRepository: BoardRepository,
    private columnRepository: ColumnRepository,
    private cardRepository: CardRepository,
  ) {}

  private async extractBoardData(board: Board): Promise<BoardResponse> {
    const columnsInBoard: ColumnEntity[] =
      await this.columnRepository.getColumnsWithBoardId(board.id);
    const boardData: BoardResponse = {
      boardId: board.id,
      name: board.name,
      columnIds: columnsInBoard.map((column: ColumnEntity) => {
        return column.id;
      }),
    };
    return boardData;
  }

  public async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<BoardResponse> {
    const newBoard: Board = await this.boardRepository.createBoard(
      createBoardDto,
      user,
    ); //save into the database and get an instance of it
    this.columnService.createStarterColumnsForBoard(newBoard.id);
    return this.extractBoardData(newBoard);
  }

  public async getUserBoardCards(user: User): Promise<BoardCardResponse[]> {
    const boards: Board[] = await this.boardRepository.getUserBoards(user);

    //turn boards into BoardCardResponse[]
    const boardCardsPromises: Promise<BoardCardResponse>[] = boards.map(
      async (board: Board) => {
        let cardAmount: number = 0;
        const columnsInBoard: ColumnEntity[] =
          await this.columnRepository.getColumnsWithBoardId(board.id);

        const columnIdPromises: Promise<string>[] = columnsInBoard.map(
          async (column: ColumnEntity) => {
            const cardsInColumn: Card[] =
              await this.cardRepository.getCardsWithColumnId(column.id);
            if (cardsInColumn && cardsInColumn.length > 0) {
              cardAmount += cardsInColumn.length;
            }
            return column.id;
          },
        );
        const columnIds : string[] = await Promise.all(columnIdPromises);


        return {
          boardId: board.id,
          title: board.name,
          columnIds: columnIds,
          columnsAmount: columnIds.length,
          cardsAmount: cardAmount,
          colorNum: board.colorNum,
          ownerUsername: user.username
        };
      },
    );

    const boardCards: BoardCardResponse[] = await Promise.all(boardCardsPromises);
    return boardCards;
  }

  public async getFirstBoard(): Promise<BoardResponse> {
    return this.extractBoardData(await this.boardRepository.getFirstBoard());
  }

  public async getBoardDataById(
    boardId: string,
    user: User,
  ): Promise<BoardResponse | undefined> {
    return this.extractBoardData(
      await this.boardRepository.getBoardById(boardId, user),
    );
  }

  //Get all boards that users owns
  /*public getAllBoards() : BoardResponse[] | undefined{
        return this.boards.map( 
            (board) => {
                return this.extractBoardData(board)
            }
        )
    }*/
}
