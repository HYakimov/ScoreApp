import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule { }