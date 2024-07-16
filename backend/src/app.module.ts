import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { DatabaseModule } from './database.module';
import { CsvModule } from './csv/csv.module';
import { ReactModule } from './react.module';
import { EventsGateway } from './events.gateway';
import { CountryModule } from './countries/country.module';
import { UserModule } from './users/user.module';
import { CompetitionModule } from './competitions/competition.module';
import { CityModule } from './cities/city.module';

@Module({
  imports: [
    DatabaseModule,
    ScoresModule,
    CountryModule,
    CsvModule,
    ReactModule,
    UserModule,
    CompetitionModule,
    CityModule
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule { }