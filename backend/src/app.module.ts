import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database.module';
import { CsvModule } from './csv/csv.module';
import { ReactModule } from './react.module';
import { EventsGateway } from './events.gateway';
import { CountryModule } from './countries/country.module';

@Module({
  imports: [
    DatabaseModule,
    ScoresModule,
    CountryModule,
    CsvModule,
    ReactModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule { }