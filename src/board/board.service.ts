import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';

import { BoardResponse } from './board.response';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './create.board.dto';
import { ColumnRepository } from 'src/column/column.repository';
import { ColumnEntity } from 'src/column/column.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    private columnService: ColumnService,
    private boardRepository: BoardRepository,
    private columnRepository: ColumnRepository,
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
    user: User
  ): Promise<BoardResponse> {
    const newBoard: Board =
      await this.boardRepository.createBoard(createBoardDto,user); //save into the database and get an instance of it
    this.columnService.createStarterColumnsForBoard(newBoard.id);
    return this.extractBoardData(newBoard);
  }

  public async getFirstBoard(): Promise<BoardResponse> {
    return this.extractBoardData(await this.boardRepository.getFirstBoard());
  }

  public async getBoardDataById(
    boardId: string,
    user: User
  ): Promise<BoardResponse | undefined> {
    return this.extractBoardData(
      await this.boardRepository.getBoardById(boardId,user),
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
