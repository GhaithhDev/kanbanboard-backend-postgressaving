import { Module, forwardRef } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { CardModule } from 'src/card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { ColumnRepository } from './column.repository';
import { CardRepository } from 'src/card/card.repository';
import { BoardRepository } from 'src/board/board.repository';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports : [forwardRef( () => CardModule),TypeOrmModule.forFeature([ColumnEntity]),forwardRef(()=>BoardModule)],
  controllers: [ColumnController],
  providers: [ColumnService,ColumnRepository,CardRepository,BoardRepository], //what services this module owns
  exports: [ColumnService,ColumnRepository], // what of these services will it export to other modules
})
export class ColumnModule {}
