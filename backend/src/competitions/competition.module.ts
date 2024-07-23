import { Module } from '@nestjs/common';
import { CompetitionController } from './competition.controller';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/countries/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competition, Country])],
  controllers: [CompetitionController],
  providers: [CompetitionService]
})
export class CompetitionModule { }