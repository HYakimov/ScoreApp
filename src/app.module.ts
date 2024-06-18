import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, ScoresModule]
})
export class AppModule {}