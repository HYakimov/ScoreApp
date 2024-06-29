// city.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) { }

    findByCountry(countryId: number) {
        return this.cityRepository.find({ where: { country: { id: countryId } } });
    }
}