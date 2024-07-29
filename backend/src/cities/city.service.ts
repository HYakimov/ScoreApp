import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Repository } from 'typeorm';
import { CityResponseDto } from './dtos/city.response..dto';
import { Country } from 'src/countries/country.entity';
import { CityDto } from './dtos/city.dto';
import { CustomException } from 'src/exceptions';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ) { }

    async addCity(dto: CityDto): Promise<void> {
        const country = await this.validateAndReturnCountry(dto.countryId);
        const newCity = this.cityRepository.create({
            name: dto.name,
            country: country
        });

        await this.cityRepository.save(newCity);
    }

    async getCitiesByCountryId(countryId: number): Promise<CityResponseDto> {
        const cities = await this.cityRepository.find({
            where: { country: { id: countryId } },
            relations: ['country'],
        });
        if (!cities) {
            throw CustomException.NotFound(`Cities not found for country with id: ${countryId}.`);
        }

        return CityResponseDto.create(cities);
    }

    private async validateAndReturnCountry(id: number): Promise<Country> {
        const country = await this.countryRepository.findOne({ where: { id } });
        if (!country) {
            throw CustomException.NotFound(`Country with id: ${id} not found.`);
        }

        return country;
    }
}