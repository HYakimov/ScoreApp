import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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