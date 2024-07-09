import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './score.entity';
import { EventsGateway } from 'src/events.gateway';
import { User } from 'src/users/user.entity';
import { Competition } from 'src/competition/competition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Competition])
  ],
  providers: [ScoresService, EventsGateway],
  controllers: [ScoresController],
})
export class ScoresModule { }