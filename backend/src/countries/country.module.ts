import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Country])],
    providers: [CountryService],
    controllers: [CountryController],
})
export class CountryModule { }