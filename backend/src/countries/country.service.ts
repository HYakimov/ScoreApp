import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CityDto } from './city.dto';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>
    ) { }

    static cities = [
        // Bulgaria
        { id: 0, name: 'Sofia', countryId: 1 },
        { id: 1, name: 'Plovdiv', countryId: 1 },
        { id: 2, name: 'Varna', countryId: 1 },
        { id: 3, name: 'Burgas', countryId: 1 },
        { id: 4, name: 'Ruse', countryId: 1 },
        { id: 5, name: 'Stara Zagora', countryId: 1 },
        { id: 6, name: 'Pleven', countryId: 1 },
        { id: 7, name: 'Sliven', countryId: 1 },
        { id: 8, name: 'Dobrich', countryId: 1 },
        { id: 9, name: 'Shumen', countryId: 1 },
        // Serbia
        { id: 10, name: 'Belgrade', countryId: 2 },
        { id: 11, name: 'Novi Sad', countryId: 2 },
        { id: 12, name: 'Niš', countryId: 2 },
        { id: 13, name: 'Kragujevac', countryId: 2 },
        { id: 14, name: 'Subotica', countryId: 2 },
        { id: 15, name: 'Zrenjanin', countryId: 2 },
        { id: 16, name: 'Pančevo', countryId: 2 },
        { id: 17, name: 'Čačak', countryId: 2 },
        { id: 18, name: 'Novi Pazar', countryId: 2 },
        { id: 19, name: 'Kraljevo', countryId: 2 },
        // Macedonia
        { id: 20, name: 'Skopje', countryId: 3 },
        { id: 21, name: 'Bitola', countryId: 3 },
        { id: 22, name: 'Kumanovo', countryId: 3 },
        { id: 23, name: 'Prilep', countryId: 3 },
        { id: 24, name: 'Tetovo', countryId: 3 },
        { id: 25, name: 'Ohrid', countryId: 3 },
        { id: 26, name: 'Veles', countryId: 3 },
        { id: 27, name: 'Stip', countryId: 3 },
        { id: 28, name: 'Strumica', countryId: 3 },
        { id: 29, name: 'Gostivar', countryId: 3 },
        // Romania
        { id: 30, name: 'Bucharest', countryId: 4 },
        { id: 31, name: 'Cluj-Napoca', countryId: 4 },
        { id: 32, name: 'Timișoara', countryId: 4 },
        { id: 33, name: 'Iași', countryId: 4 },
        { id: 34, name: 'Constanța', countryId: 4 },
        { id: 35, name: 'Craiova', countryId: 4 },
        { id: 36, name: 'Brașov', countryId: 4 },
        { id: 37, name: 'Galați', countryId: 4 },
        { id: 38, name: 'Ploiești', countryId: 4 },
        { id: 39, name: 'Oradea', countryId: 4 },
        // Greece
        { id: 40, name: 'Athens', countryId: 5 },
        { id: 41, name: 'Thessaloniki', countryId: 5 },
        { id: 42, name: 'Patras', countryId: 5 },
        { id: 43, name: 'Heraklion', countryId: 5 },
        { id: 44, name: 'Larissa', countryId: 5 },
        { id: 45, name: 'Volos', countryId: 5 },
        { id: 46, name: 'Rhodes', countryId: 5 },
        { id: 47, name: 'Ioannina', countryId: 5 },
        { id: 48, name: 'Chania', countryId: 5 },
        { id: 49, name: 'Kavala', countryId: 5 }
    ];

    static getCityName(id: number): string {
        const city = this.cities.find(city => city.id == id);
        return city.name;
    }

    getDataById(id: number): CityDto[] {
        return CountryService.cities
            .filter(city => city.countryId == id)
            .map(city => CityDto.create(city.id, city.name, city.countryId));
    }

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    getCities(id: number): CityDto[] {
        return this.getDataById(id);
    }

    async addCountry(name: string): Promise<void> {
        const newCountry = this.countryRepository.create({ name });
        await this.countryRepository.save(newCountry);
    }
}