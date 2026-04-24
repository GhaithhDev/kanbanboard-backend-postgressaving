import { Module, forwardRef } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

import { ColumnModule } from 'src/column/column.module';
import { CardModule } from 'src/card/card.module';
import { ColumnRepository } from 'src/column/column.repository';
import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ColumnModule,
    forwardRef( () => CardModule),
    TypeOrmModule.forFeature([Board]),
    AuthModule
    ],//what other modules this module needs
  controllers: [BoardController], // what controllers this module owns
  providers: [BoardService,BoardRepository,ColumnRepository], // what services this module owns
  exports: [BoardService]
})
export class BoardModule {}
