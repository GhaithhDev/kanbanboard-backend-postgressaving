import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { DataSource } from 'typeorm';
import { CreateColumnDTO } from './create-column.dto';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';
import { GetColumnDTO } from './get-column.dto';

@Injectable()
export class ColumnRepository extends Repository<ColumnEntity> {
  constructor(private dataSource: DataSource, private boardRepository : BoardRepository) {
    super(ColumnEntity, dataSource.createEntityManager());
  }

  private async validateBoardId(boardId : string){
    const board : Board | null = boardId ? await this.boardRepository.findOne({
      where : { id : boardId }
    }) : null
    if (!boardId || !board) {
      throw new BadRequestException("Board id is not valid.");
    }

    return true
  }

  public async getColumnById(columnId : string) : Promise<ColumnEntity> {
    
    const result : ColumnEntity | null = await this.findOne({
      where: { id: columnId }
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  public async getColumnsWithBoardId(boardId: string) : Promise<ColumnEntity[]> {
    this.validateBoardId(boardId);
    
    const result : ColumnEntity[] = await this.findBy({ parentBoardId: boardId });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  
  public async createColumn(createColumnDTO: CreateColumnDTO): Promise<ColumnEntity> {
    const { boardId , columnName } = createColumnDTO;
   
    this.validateBoardId(boardId);

    const newColumn = this.create({
      name: columnName,
      parentBoardId: boardId
    });

    try {
      const savedColumn = await this.save(newColumn);
      return savedColumn;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create board');
    }
  }
}
