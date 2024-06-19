import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [DatabaseModule, ScoresModule, CsvModule],
  providers: [],
  controllers: []
})
export class AppModule {}