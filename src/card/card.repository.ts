import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { DataSource } from 'typeorm';
import { CreateCardDto } from './create-card.dto';
import { Priority } from 'src/enums/priority';
import { EditCardDto } from './edit-card.dto';
import { GetCardsFilterDto } from './get-cards-fitler.dto';
import { ColumnEntity } from 'src/column/column.entity';
import { ColumnRepository } from 'src/column/column.repository';

@Injectable()
export class CardRepository extends Repository<Card> {
  constructor(
    private dataSource: DataSource,
    private columnRepository: ColumnRepository,
  ) {
    super(Card, dataSource.createEntityManager());
  }

  private async validateColumnId(columnId: string) {
    const column: ColumnEntity | null = columnId
      ? await this.columnRepository.findOne({
          where: { id: columnId },
        })
      : null;
    if (!columnId || !column) {
      throw new BadRequestException('column id is not valid.');
    }

    return true;
  }

  public async getCardById(cardId: string) {
    if (!cardId) {
      throw new BadRequestException();
    }
    const result = await this.findOne({ where: { id: cardId } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  public async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { title, priority, description, parentColumnId } = createCardDto;

    this.validateColumnId(parentColumnId);

    const newCard = this.create({
      title: title,
      parentColumnId: parentColumnId,
      priority: priority ? priority : Priority.NORMAL,
      description: description ? description : '',
    });

    try {
      const savedCard = await this.save(newCard);
      return savedCard; // a promise of Card will be returned even tho we are returned Card, the caller will need to await to get the result of that promise
    } catch (error) {
      throw new InternalServerErrorException('Failed to create card');
    }
  }

  public async deleteCard(cardId: string) {
    if (!cardId) {
      throw new BadRequestException();
    }
    try {
      const result = await this.delete(cardId);
      if (result.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `failed to delete card with card id ${cardId} `,
      );
    }
  }

  public async updateCardDetails(editCardDto: EditCardDto): Promise<Card> {
    //get a copy of the card entity from the data base
    let card: Card | undefined = await this.getCardById(editCardDto.cardId);

    //mutate that copy
    //card.columnId = editCardDto.columnId;
    card.title = editCardDto.title;
    card.description = editCardDto.description;
    card.priority = editCardDto.priority;

    //commit the changes
    try {
      const savedCard = await this.save(card);
      return savedCard;
    } catch (error) {
      throw new InternalServerErrorException(
        `error saving card with id ${card.id} to the data base, error: ${error}`,
      );
    }
  }

  public async getCards(getCardsFilter: GetCardsFilterDto): Promise<Card[]> {
    const query = this.createQueryBuilder('card');
    const { search, priority, columnId } = getCardsFilter;

    if (priority) {
      query.andWhere('card.priority = :priority', { priority: priority });
    }

    if (search) {
      query.andWhere(
        'card.title ILIKE :search OR card.description ILIKE :search',
        { search: `%${search}%` },
      );
    }
    /*if (columnId){
      query.andWhere('card.columnId = :columnId', {columnId : columnId});
    }*/

    return query.getMany();
  }

  public async getCardsWithColumnId(columnId: string): Promise<Card[]> {
    this.validateColumnId(columnId);
    const result: Card[] = await this.findBy({ parentColumnId: columnId });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
