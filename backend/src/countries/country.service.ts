import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ) { }

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    async addCountry(name: string): Promise<void> {
        const newCountry = this.countryRepository.create({ name });
        await this.countryRepository.save(newCountry);
    }
}