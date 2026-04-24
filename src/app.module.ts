import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [CardModule, ColumnModule, BoardModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'LM79K4D2QysFIy',
      database: 'kanbanboard',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  
})
export class AppModule {}
