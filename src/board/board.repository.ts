import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { DataSource } from 'typeorm';
import { CreateBoardDto } from './create.board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  public async getBoardById(boardId: string, user: User) {
    if (!boardId) {
      throw new BadRequestException();
    }
    const result = await this.findOne({ where: { id: boardId, ownerId: user.id } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  public async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { name } = createBoardDto;

    const newBoard = this.create({
      ownerId: user.id,
      name: name,
      authorizedUsers: []
    });

    try {
      const savedBoard = await this.save(newBoard);
      return savedBoard; // a promise of board will be returned even tho we are returned board, the caller will need to await to get the result of that promise
    } catch (error) {
      throw new InternalServerErrorException('Failed to create board');
    }

  }

  public async getFirstBoard() : Promise<Board>{
      const result = await this.findOne({
        where: {}
      })
      if (!result){
        throw new NotFoundException();
      }
      return result;
  }
}
