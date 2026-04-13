import {
  BadRequestException,
  Get,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Card } from './card.entity';

//Enums
import { Priority } from 'src/enums/priority';

import { EditCardDto } from './edit-card.dto';
import { CardRepository } from './card.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './create-card.dto';
import { GetCardsFilterDto } from './get-cards-fitler.dto';

@Injectable()
export class CardService {
  constructor(private cardRepository: CardRepository) {}

  public async getCardById(cardId: string) {
    return this.cardRepository.getCardById(cardId);
  }

  public createCard(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardRepository.createCard(createCardDto);
  }

  public deleteCard(cardId: string) {
    return this.cardRepository.deleteCard(cardId);
  }

  async updateCardDetails(editCardDto: EditCardDto) {
    return this.cardRepository.updateCardDetails(editCardDto);
  }

  getCards (getCardsFilter : GetCardsFilterDto) : Promise<Card[]> {
    return this.cardRepository.getCards(getCardsFilter);
  }

  /*//get all cards by column id
    public getCardsByColumnId(columnId : string) : Card[] {
        return this.cards.filter((card) => card.columnId === columnId);
    }
*/

  //async because this function will yield and I don't want the called to be yielded to unless he wants to
}
