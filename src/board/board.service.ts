import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ColumnService } from 'src/column/column.service';

import { boardAuthorizedUser, BoardResponse } from './board.response';
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
import { ArrayContains, In } from 'typeorm';
import { UsersRepository } from 'src/auth/users.repository';
import { AddUserToBoardDto } from './add-user-to-board.dto';
import { use } from 'passport';

@Injectable()
export class BoardService {
  constructor(
    private columnService: ColumnService,
    private boardRepository: BoardRepository,
    private columnRepository: ColumnRepository,
    private cardRepository: CardRepository,
    private userRepository: UsersRepository,
  ) {}

  private async extractBoardData(board: Board) {
    const columnsInBoard: ColumnEntity[] =
      await this.columnRepository.getColumnsWithBoardId(board.id);
    const boardData = {
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
  ): Promise<BoardCardResponse[]> {
    const newBoard: Board = await this.boardRepository.createBoard(
      createBoardDto,
      user,
    ); //save into the database and get an instance of it
    this.columnService.createStarterColumnsForBoard(newBoard.id);
    return this.getUserBoardCards(user);
  }

  private async getBoardCardResponses(user: User, boards: Board[]) {
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
        const columnIds: string[] = await Promise.all(columnIdPromises);

        const boardOwner: User | null = await this.userRepository.findOne({
          where: { id: board.ownerId },
        });
        return {
          boardId: board.id,
          title: board.name,
          columnIds: columnIds,
          columnsAmount: columnIds.length,
          cardsAmount: cardAmount,
          colorNum: board.colorNum,
          ownerUsername: boardOwner? boardOwner.username : '???',
        };
      },
    );

    return await Promise.all(boardCardsPromises);
  }

  public async getUserBoardCards(user: User): Promise<BoardCardResponse[]> {
    const boards: Board[] = await this.boardRepository.getUserBoards(user);

    const boardCards = await this.getBoardCardResponses(user, boards);
    return boardCards;
  }

  public async getSharedBoards(user: User): Promise<BoardCardResponse[]> {
    const boards: Board[] = await this.boardRepository.getSharedBoards(user);
    const boardCards = await this.getBoardCardResponses(user, boards);
    return boardCards;
  }

  public async getBoardDataById(
    boardId: string,
  ): Promise<BoardResponse | undefined> {
    const board: Board = await this.boardRepository.getBoardById(boardId);
    const boardData = await this.extractBoardData(board);
    const authorizedUserIds = board.authorizedUserIds;
    const users: User[] = await this.userRepository.findBy({
      id: In(authorizedUserIds),
    });
    const authorizedUsers: boardAuthorizedUser[] = users.map((user: User) => ({
      username: user.username,
      color: user.userColorNum,
    }));
    const boardOwner: User | null = await this.userRepository.findOne({
      where: { id: board.ownerId },
    });
    if (boardOwner) {
      authorizedUsers.push({
        username: boardOwner.username,
        color: boardOwner.userColorNum,
      });
    }

    return {
      ...boardData,
      authorizedUsers: authorizedUsers,
    };
  }

  public async addUserToBoard(
    addUserToBoardDto: AddUserToBoardDto,
  ): Promise<BoardResponse | undefined> {
    const { username, boardId } = addUserToBoardDto;
    const board: Board = await this.boardRepository.getBoardById(boardId);
    const user: User = await this.userRepository.getUserByUsername(username);
    if (board.authorizedUserIds.includes(user.id)) {
      throw new ConflictException('User already got access to this board');
    }

    board.authorizedUserIds.push(user.id);
    await this.boardRepository.save(board);
    return this.getBoardDataById(board.id);
  }

  public async deleteBoard(boardId: string) {
    const columns: ColumnEntity[] = await this.columnRepository.getColumnsWithBoardId(boardId);
    for( let i =0; i<columns.length; i++ ){
      this.cardRepository.delete({parentColumnId: columns[i].id}) //delete related cards
      this.columnRepository.delete({ id: columns[i].id });
    }
    this.boardRepository.delete({ id: boardId })
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
