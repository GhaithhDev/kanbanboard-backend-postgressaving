import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  forwardRef,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './create-card.dto';
import { BoardService } from 'src/board/board.service';
import { EditCardDto } from './edit-card.dto';
import { CardResponse } from './card.response';
import { UpdateExternalWorkerDto } from './update-external-worker.dto';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('create')
  createCard(@Body() createCardDTO: CreateCardDto): Promise<CardResponse[]> {
    console.log('reached', createCardDTO);
    return this.cardService.createCard(createCardDTO); //nest js will await internally to get the result of that promise
  }

  @Get('columnId/:columnId')
  getCardsWithColumnId(
    @Param('columnId') columnId: string,
  ): Promise<CardResponse[]> {
    return this.cardService.getCardsWithColumnId(columnId);
  }

  @Get('boardId/:boardId')
  getCardsWithBoardId(
    @Param('boardId') boardId: string,
  ): Promise<CardResponse[]> {
    return this.cardService.getCardsWithBoardId(boardId);
  }

  @Delete('/:id')
  deleteCardById(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }

  /*@Get('/:id')
    private getCardById(@Param('id') id: string) : Promise<Card>{
        return this.cardService.getCardById(id);
    }*/

  @Patch('editCard')
  updateCardDetails(@Body() editCardDto: EditCardDto): Promise<CardResponse[]> {
    return this.cardService.updateCardDetails(editCardDto);
  }

  @Patch('externalWorker')
  updateExternalWorker(@Body() updateExternalWorkerDto: UpdateExternalWorkerDto ){
    return this.cardService.updateExternalWorker(updateExternalWorkerDto);
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
