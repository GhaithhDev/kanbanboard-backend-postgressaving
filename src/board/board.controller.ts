import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './create.board.dto';
import { GetBoardDto } from './get.board.dto';

import { type } from 'os';
import { BoardRepository } from './board.repository';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardCardResponse } from './board-card.response';
import { AddUserToBoardDto } from './add-user-to-board.dto';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {

    constructor(
        private boardService: BoardService,
        private boardRepository: BoardRepository
    ) {} // inject BoardService to be a member of this class

    @Get('owned')
    getOwnedBoards(@GetUser() user: User): Promise<BoardCardResponse[]>  {
        return this.boardService.getUserBoardCards(user);
    }


    @Get('shared')
    getSharedBoards(@GetUser() user: User ): Promise<BoardCardResponse[]> {
        return this.boardService.getSharedBoards(user);
    }

    @Get('/:boardId')
    getBoardDataById(@Param('boardId') boardId : string ){
        return this.boardService.getBoardDataById(boardId);
    }
    
    @Post('create')
    createBoard(@Body() createBoardDto : CreateBoardDto, @GetUser() user: User  ): Promise<BoardCardResponse[]>{
       return this.boardService.createBoard(createBoardDto,user);
    }

    @Post('add/user')
    addUserToBoard(@Body() addUserToBoardDto: AddUserToBoardDto){
        return this.boardService.addUserToBoard(addUserToBoardDto);
    }

}
