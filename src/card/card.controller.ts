import { Controller, Get, Post, Body, Inject, forwardRef, Patch, Param, BadRequestException, Delete, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './create-card.dto';
import { BoardService } from 'src/board/board.service';
import { EditCardDto } from './edit-card.dto';
import { Card } from './card.entity';
import { GetCardsFilterDto } from './get-cards-fitler.dto';

@Controller('card')
export class CardController {

    constructor(
        private cardService: CardService,
        @Inject( forwardRef( () => BoardService ) )
        private boardService: BoardService
    ) {}

    @Post()
    createCard(@Body() createCardDTO : CreateCardDto ) : Promise<Card>{
       return this.cardService.createCard(createCardDTO); //nest js will await internally to get the result of that promise
    }

    @Delete('/:id')
    private deleteCardById(@Param('id') id: string){
        return this.cardService.deleteCard(id);
    }

    @Get()
    private getCards( @Query() getCardsFilter : GetCardsFilterDto) : Promise<Card[]>{
        return this.cardService.getCards(getCardsFilter);
    }

    @Get('/:id')
    private getCardById(@Param('id') id: string) : Promise<Card>{
        return this.cardService.getCardById(id);
    }

    @Patch('editCard')
    updateCardDetails( @Body() editCardDto : EditCardDto){
        return this.cardService.updateCardDetails(editCardDto);
   }

   //other functions to update individual properties of the card like title, description, priority, etc
   //@Patch('/:id/title') // and then title from the body
   //@Patch('/:id/description') // and then description from the body
   //@Patch('/:id/priority') // and then priority from the body
    /*
   @Post('editCard')
   updateCardDetails( @Body() editCardDto : EditCardDTO){
        this.cardService.editCardDetails(editCardDto);
        const newBoardData = this.boardService.getAllBoards()
        if (newBoardData){
            return newBoardData[0];
        }
        return newBoardData
   }

   @Patch('/:id/title')
   updateTitle(@Param("id") id : string, @Body('title') newTitle: string){
    this.cardService.updateCardTitle(id,newTitle);
   }*/
}
