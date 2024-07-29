import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CountriesDto } from './dtos/countries.dto';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ) { }

    async getCountries(): Promise<CountriesDto> {
        const result = await this.countryRepository.find();
        return CountriesDto.create(result);
    }

    async addCountry(name: string): Promise<void> {
        const newCountry = this.countryRepository.create({ name });
        await this.countryRepository.save(newCountry);
    }
}