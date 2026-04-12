import { Module, forwardRef } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { ColumnModule } from 'src/column/column.module';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [
    ColumnModule,
    forwardRef( () => CardModule)
    ],//what other modules this module needs
  controllers: [BoardController], // what controllers this module owns
  providers: [BoardService], // what services this module owns
  exports: [BoardService]
})
export class BoardModule {}
