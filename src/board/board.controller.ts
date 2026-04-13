import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './create.board.dto';
import { GetBoardDto } from './getBoardData.dto';

import { type } from 'os';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService) {} // inject BoardService to be a member of this class

    /*@Get()
    getAllBoards(){
        return this.boardService.getAllBoards()
    }

    @Get('boardId')
    getBoardDataById(@Body() getBoardDto : GetBoardDto ){
        return this.boardService.getBoardDataById(getBoardDto.boardId)
    }

    @Post('create')
    createBoard(@Body() createBoardDto : CreateBoardDto ){
       return this.boardService.createBoard(createBoardDto.name);
    }*/
}
