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
    scoreId: number;
    scoreValue: number;
    competitionId: number;

    static create(user: any): UserDto {
        const record = new UserDto();
        record.firstName = user.firstName;
        record.lastName = user.lastName;
        record.age = user.age;
        record.countryName = user.countryName;
        record.countryId = user.countryId;
        record.cityName = user.cityName;
        record.cityId = user.cityId;
        record.gender = user.gender;
        record.email = user.email;
        record.avatarPath = user.avatarPath;
        record.scoreId = user.scoreId;
        record.scoreValue = user.scoreValue;
        record.competitionId = user.competitionId;
        record.id = user.id;

        return record;
    }
}