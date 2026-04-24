import { Module, forwardRef } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { BoardModule } from 'src/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardRepository } from './card.repository';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [forwardRef(() => BoardModule), TypeOrmModule.forFeature([Card]), forwardRef(()=> ColumnModule)],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService],
})
export class CardModule {}
