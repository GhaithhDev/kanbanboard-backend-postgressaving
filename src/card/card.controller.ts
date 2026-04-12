import { Controller, Get, Post, Body, Inject, forwardRef, Patch, Param } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDTO } from './createCard.dto';
import { BoardService } from 'src/board/board.service';
import type { Card } from './card.object'
import { EditCardDTO } from './editCard.dto';

@Controller('card')
export class CardController {

    constructor(
        private cardService: CardService,
        @Inject( forwardRef( () => BoardService ) )
        private boardService: BoardService
    ) {}

    @Post('create')
    createCard(@Body() createCardDTO : CreateCardDTO  ){
        console.log(createCardDTO.columnId)
        this.cardService.createCard(createCardDTO.columnId,createCardDTO.title,createCardDTO.description,createCardDTO.priority); 
        const newBoardData = this.boardService.getAllBoards()
        if (newBoardData){
            return newBoardData[0];
        }
        return newBoardData
    }
    
   @Post('editCard')
   updateCardDetails( @Body() editCardDto : EditCardDTO){
        this.cardService.editCardDetails(editCardDto);
        const newBoardData = this.boardService.getAllBoards()
        if (newBoardData){
            return newBoardData[0];
        }
        return newBoardData
   }

   /*@Patch('/:id/title')
   updateTitle(@Param("id") id : string, @Body('title') newTitle: string){
    this.cardService.updateCardTitle(id,newTitle);
   }*/
}
