export class FormData {
    id: number | null;
    firstName: string;
    lastName: string;
    age: number | null;
    gender: string;
    email: string;
    avatarPath: string;
    countryName: string;
    countryId: number | null;
    cityName: string;
    cityId: number | null;
    scores: { scoreId: number, scoreValue: number, competitionId: number }[] | null;

    constructor(data: FormData) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.countryName = data.countryName;
        this.countryId = data.countryId;
        this.cityName = data.cityName;
        this.cityId = data.cityId;
        this.gender = data.gender;
        this.email = data.email;
        this.avatarPath = data.avatarPath;
        this.id = data.id;
        this.scores = data.scores;
    }
}