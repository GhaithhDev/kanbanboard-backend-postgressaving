import {
  Injectable,
} from '@nestjs/common';
import { Card } from './card.entity';


import { EditCardDto } from './edit-card.dto';
import { CardRepository } from './card.repository';
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
}
