import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database.module';
import { CsvModule } from './csv/csv.module';
import { ReactModule } from './react.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    DatabaseModule,
    ScoresModule,
    CsvModule,
    ReactModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule { }