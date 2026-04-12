import { Module, forwardRef } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { CardModule } from 'src/card/card.module';

@Module({
  imports : [forwardRef( () => CardModule)],
  controllers: [ColumnController],
  providers: [ColumnService], //what services this module owns
  exports: [ColumnService], // what of these services will it export to other modules
})
export class ColumnModule {}
