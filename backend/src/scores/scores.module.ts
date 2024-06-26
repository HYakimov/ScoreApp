import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './score.entity';
import { EventsGateway } from 'src/events.gateway';
import { Country } from 'src/countries/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), TypeOrmModule.forFeature([Country])],
  providers: [ScoresService, EventsGateway],
  controllers: [ScoresController],
})
export class ScoresModule { }