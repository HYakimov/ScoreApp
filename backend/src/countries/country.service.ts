import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) { }

    findAll() {
        return this.countryRepository.find({ relations: ['cities'] });
    }
}