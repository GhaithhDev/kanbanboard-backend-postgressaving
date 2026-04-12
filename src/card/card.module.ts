import { Module , forwardRef } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { BoardModule } from 'src/board/board.module';

@Module({
 
  imports: [forwardRef( () => BoardModule)],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService], 
})
export class CardModule {}
