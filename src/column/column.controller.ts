import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ColumnService } from './column.service';

import { ColumnResponse } from './column-response';
import { CreateColumnDTO } from './create-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get('/:columnId')
  getColumnById(@Param('columnId') columnId: string): Promise<ColumnResponse> {
    return this.columnService.getColumnById(columnId);
  }

  @Post('create')
  async createColumn(
    @Body() createColumnDTO: CreateColumnDTO,
  ): Promise<string> {
    return (await this.columnService.createColumn(createColumnDTO)).id;
  }

  @Delete('/:id')
  deleteColumn(@Param('id') columnId: string) {
    this.columnService.deleteColumn(columnId);
  }
}