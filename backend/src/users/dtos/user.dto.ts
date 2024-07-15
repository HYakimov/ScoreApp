import { CountryService } from "src/countries/country.service"

export class UserDto {

    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    avatarPath: string;
    countryId: number;
    countryName: string;
    cityId: number;
    cityName: string;
    scores: { scoreId: number, scoreValue: number, competitionId: number }[];//Needs to make dto here

    static getCityName(cityId: number): string {
        return CountryService.getCityName(cityId);
    }

    static create(user: any): UserDto {
        const record = new UserDto();
        record.firstName = user.firstName;
        record.lastName = user.lastName;
        record.age = user.age;
        record.scores = user.scores ? user.scores.split(',').map(score => {
            const [scoreId, scoreValue, competitionId] = score.split(':').map(Number);
            return { scoreId, scoreValue, competitionId };
        }) : [];
        record.countryName = user.countryName;
        record.countryId = user.countryId;
        record.cityName = UserDto.getCityName(user.cityId);
        record.cityId = user.cityId;
        record.gender = user.gender;
        record.email = user.email;
        record.avatarPath = user.avatarPath;
        record.id = user.id;

        return record;
    }
}