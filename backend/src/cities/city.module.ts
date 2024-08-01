import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/countries/country.entity';
import { City } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country])],
  providers: [CityService],
  controllers: [CityController]
})
export class CityModule { }