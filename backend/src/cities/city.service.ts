import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';
import { CityResponseDto } from './dtos/city.response..dto';
import { Country } from 'src/countries/country.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ) { }

    async addCity(city: any): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: city.countryId } });
        const newCity = this.cityRepository.create({
            name: city.name,
            country: country
        });
        await this.cityRepository.save(newCity);
    }

    async getCitiesByCountryId(countryId: number): Promise<CityResponseDto> {
        const cities = await this.cityRepository.find({
            where: { country: { id: countryId } },
            relations: ['country'],
        });

        return CityResponseDto.create(cities);
    }
}