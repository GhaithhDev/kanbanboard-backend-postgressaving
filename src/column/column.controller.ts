import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ColumnService } from './column.service';

import { CreateColumnDTO } from './createColumn.dto';


@Controller('column')
export class ColumnController {

    constructor (private columnService : ColumnService) {}

    /*@Get()
    private getAllColumns(){
        return this.columnService.getAllColumns()
    }

    @Get('/:id')
    private getColumnById(@Param('id') id: string){
        //Just like this I got the id from the header
    }

    @Post('create')
    private createColumn(@Body() createColumnDTO : CreateColumnDTO){
        this.columnService.createColumn(createColumnDTO.columnName,createColumnDTO.boardId);
    }*/
}
