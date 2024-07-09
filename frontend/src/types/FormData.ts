export class FormData {
    firstName: string;
    lastName: string;
    age: number | null;
    scoreId: number | null;
    scoreValue: number | null;
    countryName: string;
    countryId: number | null;
    cityName: string;
    cityId: number | null;
    gender: string;
    email: string;
    avatarPath: string;
    id: number | null;

    constructor(data: FormData) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.scoreId = data.scoreId;
        this.scoreValue = data.scoreValue;
        this.countryName = data.countryName;
        this.countryId = data.countryId;
        this.cityName = data.cityName;
        this.cityId = data.cityId;
        this.gender = data.gender;
        this.email = data.email;
        this.avatarPath = data.avatarPath;
        this.id = data.id;
    }
}