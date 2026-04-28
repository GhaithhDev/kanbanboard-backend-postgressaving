import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ColumnService } from './column.service';

import { ColumnResponse } from './column-response';
import { CreateColumnDTO } from './create-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  /*@Get('/:columnId')
  getColumnById(@Param('columnId') columnId: string): Promise<ColumnResponse> {
    return this.columnService.getColumnById(columnId);
  }*/

  @Get('/:boardId')
  getColumnsWithBoardId(@Param('boardId') boardId: string): Promise<ColumnResponse[]> {
    return this.columnService.getColumnsWithBoardId(boardId);
  }

  @Post('create')
  async createColumn(
    @Body() createColumnDTO: CreateColumnDTO,
  ): Promise<ColumnResponse[]> {
    return await this.columnService.createColumn(createColumnDTO);
  }

  @Delete('/:id')
  deleteColumn(@Param('id') columnId: string) {
    this.columnService.deleteColumn(columnId);
  }
}