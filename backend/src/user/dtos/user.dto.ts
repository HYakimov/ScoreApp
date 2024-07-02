import { CountryService } from "src/countries/country.service"
import { User } from "../user.entity"

export class UserDto {

    firstName: string;
    lastName: string;
    age: number;
    scoreId: number | null;
    scoreValue: number | null;
    countryId: number;
    countryName: string;
    cityId: number;
    cityName: string;
    gender: string;
    email: string;
    id: number;

    static getCityName(cityId: number): string {
        return CountryService.getCityName(cityId);
    }

    static create(user: User): UserDto {
        const record = new UserDto();
        record.firstName = user.firstName;
        record.lastName = user.lastName;
        record.age = user.age;
        record.scoreId = user.score ? user.score.id : null;
        record.scoreValue = user.score ? user.score.value : null;
        record.countryName = user.country.name;
        record.countryId = user.country.id;
        record.cityName = UserDto.getCityName(user.city);
        record.cityId = user.city;
        record.gender = user.gender;
        record.id = user.id;

        return record;
    }

}