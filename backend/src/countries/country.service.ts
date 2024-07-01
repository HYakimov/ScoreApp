import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { MyCollection } from './types';

@Injectable()
export class CountryService {

    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
    ) {
        this.myData['Bulgaria'] = [
            { id: 1, name: 'Sofia' },
            { id: 2, name: 'Plovdiv' },
            { id: 3, name: 'Varna' },
            { id: 4, name: 'Burgas' },
            { id: 5, name: 'Ruse' },
            { id: 6, name: 'Stara Zagora' },
            { id: 7, name: 'Pleven' },
            { id: 8, name: 'Sliven' },
            { id: 9, name: 'Dobrich' },
            { id: 10, name: 'Shumen' }
        ];
        this.myData['Serbia'] = [
            { id: 1, name: 'Belgrade' },
            { id: 2, name: 'Novi Sad' },
            { id: 3, name: 'Niš' },
            { id: 4, name: 'Kragujevac' },
            { id: 5, name: 'Subotica' },
            { id: 6, name: 'Zrenjanin' },
            { id: 7, name: 'Pančevo' },
            { id: 8, name: 'Čačak' },
            { id: 9, name: 'Novi Pazar' },
            { id: 10, name: 'Kraljevo' }
        ];
        this.myData['Macenodia'] = [
            { id: 1, name: 'Skopje' },
            { id: 2, name: 'Bitola' },
            { id: 3, name: 'Kumanovo' },
            { id: 4, name: 'Prilep' },
            { id: 5, name: 'Tetovo' },
            { id: 6, name: 'Ohrid' },
            { id: 7, name: 'Veles' },
            { id: 8, name: 'Stip' },
            { id: 9, name: 'Strumica' },
            { id: 10, name: 'Gostivar' }
        ];
        this.myData['Romania'] = [
            { id: 1, name: 'Bucharest' },
            { id: 2, name: 'Cluj-Napoca' },
            { id: 3, name: 'Timișoara' },
            { id: 4, name: 'Iași' },
            { id: 5, name: 'Constanța' },
            { id: 6, name: 'Craiova' },
            { id: 7, name: 'Brașov' },
            { id: 8, name: 'Galați' },
            { id: 9, name: 'Ploiești' },
            { id: 10, name: 'Oradea' }
        ];
        this.myData['Greece'] = [
            { id: 1, name: 'Athens' },
            { id: 2, name: 'Thessaloniki' },
            { id: 3, name: 'Patras' },
            { id: 4, name: 'Heraklion' },
            { id: 5, name: 'Larissa' },
            { id: 6, name: 'Volos' },
            { id: 7, name: 'Rhodes' },
            { id: 8, name: 'Ioannina' },
            { id: 9, name: 'Chania' },
            { id: 10, name: 'Kavala' }
        ];
    }

    private myData: MyCollection = {};

    getDataByKey(key: string): { id: number, name: string }[] {
        return this.myData[key];
    }

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find();
    }

    getCities(country: string): { id: number, name: string }[] {
        return this.getDataByKey(country);
    }

    async addCountry(name: string): Promise<void> {
        const newCountry = this.countryRepository.create({ name });
        await this.countryRepository.save(newCountry);
    }
}