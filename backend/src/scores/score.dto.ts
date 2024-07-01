import { CountryService } from "src/countries/country.service"
import { Score } from "./score.entity"

export class ScoreDto {
    firstName: string
    lastName: string
    age: number
    score: number
    countryName: string
    countryId: number
    cityName: string
    cityId: number
    gender: string
    id: number

    static getCityName(cityId: number): string {
        return CountryService.getCityName(cityId);
    }

    static create(score: Score): ScoreDto {
        const record = new ScoreDto();
        record.firstName = score.firstName;
        record.lastName = score.lastName;
        record.age = score.age;
        record.score = score.score;
        record.id = score.id;
        record.countryName = score.country.name;
        record.countryId = score.country.id;
        record.cityName = ScoreDto.getCityName(score.city);
        record.cityId = score.city;
        record.gender = score.gender;
        return record;
    }
}