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
    avatarPath: string;
    id: number;
    competitionId: number;

    static getCityName(cityId: number): string {
        return CountryService.getCityName(cityId);
    }

    static create(user: User): UserDto {
        const record = new UserDto();
        record.firstName = user.firstName;
        record.lastName = user.lastName;
        record.age = user.age;
        if (user.scores && user.scores.length > 0) {
            record.scoreId = user.scores[0].id || null;
            record.scoreValue = user.scores[0].value || null;
            record.competitionId = user.scores[0].competition ? user.scores[0].competition.id : null;
        } else {
            record.scoreId = null;
            record.scoreValue = null;
            record.competitionId = null;
        }
        record.countryName = user.country.name;
        record.countryId = user.country.id;
        record.cityName = UserDto.getCityName(user.city);
        record.cityId = user.city;
        record.gender = user.gender;
        record.email = user.email;
        record.avatarPath = user.avatarPath;
        record.id = user.id;

        return record;
    }
}