import { Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid'

//Enums
import { Priority } from 'src/enums/priority';

//Types
import type { Card } from './card.object';
import { EditCardDTO } from './editCard.dto';



@Injectable()
export class CardService {
    private cards : Card[] = []
    // Functionality //
    // function to create a new card

    
    public createCard(columnId,cardTitle,cardDescription?, cardPriority?){
        const card : Card = {
            id: uuid(),
            title: cardTitle,
            priority: cardPriority ? cardPriority :  Priority.HIGH,
            startDate: Date.now(),
            description: cardDescription ? cardDescription : "",
            columnId: columnId,
        }
        console.log(card);
        this.cards.push(card)
        return card;
    }
    //function to update a card by id
    editCardDetails(editCardDto : EditCardDTO){
        let card : Card | undefined = this.getCardByCardId(editCardDto.cardId);
        if (!card){
            console.warn("provided invalid id");
            return;
        }

        card.columnId = editCardDto.columnId;
        card.title = editCardDto.title;
        card.description = editCardDto.description;
        card.priority = editCardDto.priority;

        return true;
    }
    //function to delete a card by id

   
    //get all cards by column id
    public getCardsByColumnId(columnId : string) : Card[] {
        return this.cards.filter((card) => card.columnId === columnId);
    }

    public getCardByCardId(cardId : string) : Card | undefined {
        for (let i = 0; i < this.cards.length; i++){
            if (this.cards[i].id == cardId){
                return this.cards[i];
            }
        }
    }

}
