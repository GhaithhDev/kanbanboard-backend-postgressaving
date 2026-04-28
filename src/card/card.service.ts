import { Injectable } from '@nestjs/common';
import { Card } from './card.entity';

import { EditCardDto } from './edit-card.dto';
import { CardRepository } from './card.repository';
import { CreateCardDto } from './create-card.dto';
import { CardResponse } from './card.response';
import { ColumnRepository } from 'src/column/column.repository';
import { ColumnEntity } from 'src/column/column.entity';
import { Board } from 'src/board/board.entity';
import { UpdateExternalWorkerDto } from './update-external-worker.dto';

@Injectable()
export class CardService {
  constructor(
    private cardRepository: CardRepository,
    private columnRepository: ColumnRepository,
  ) {}

  public async getCardById(cardId: string) {
    return this.cardRepository.getCardById(cardId);
  }

  public async getCardsWithColumnId(columnId: string): Promise<CardResponse[]> {
    const cards: Card[] =
      await this.cardRepository.getCardsWithColumnId(columnId);
    return cards.map((card: Card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      priority: card.priority,
      parentColumnId: card.parentColumnId,
    }));
  }

  public async getCardsWithBoardId(boardId: string): Promise<CardResponse[]> {
    const columns: ColumnEntity[] =
      await this.columnRepository.getColumnsWithBoardId(boardId);
    const cardsInBoard: CardResponse[] = [];

    for (let i = 0; i < columns.length; i++) {
      const column: ColumnEntity = columns[i];
      const cardsInColumn: Card[] =
        await this.cardRepository.getCardsWithColumnId(column.id);
      for (let j = 0; j < cardsInColumn.length; j++) {
        const card: Card = cardsInColumn[j];
        const cardResponse: CardResponse = {
          id: card.id,
          title: card.title,
          description: card.description,
          priority: card.priority,
          parentColumnId: card.parentColumnId,
          externalWorker: card.externalWorker
        };
        cardsInBoard.push(cardResponse);
      }
    }
    return cardsInBoard;
  }

  public async createCard(
    createCardDto: CreateCardDto,
  ): Promise<CardResponse[]> {
    const { parentColumnId, boardId } = createCardDto;

    const createdCard: Card =
      await this.cardRepository.createCard(createCardDto);

    return await this.getCardsWithBoardId(boardId);
  }

  public deleteCard(cardId: string) {
    return this.cardRepository.deleteCard(cardId);
  }

  async updateCardDetails(editCardDto: EditCardDto): Promise<CardResponse[]> {
    await this.cardRepository.updateCardDetails(editCardDto);
    const column: ColumnEntity = await this.columnRepository.getColumnById(
      editCardDto.parentColumnId,
    );
    return await this.getCardsWithBoardId(column.parentBoardId);
  }

  async updateExternalWorker(updateExternalWorkerDto: UpdateExternalWorkerDto){
    const { cardId, externalWorker } = updateExternalWorkerDto;
    const card: Card = await this.cardRepository.getCardById(cardId);
    this.updateCardDetails({...card, externalWorker: externalWorker});
  }

  /*getCards (getCardsFilter : GetCardsFilterDto) : Promise<Card[]> {
    return this.cardRepository.getCards(getCardsFilter);
  }*/
}
