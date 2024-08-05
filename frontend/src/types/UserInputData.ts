export class UserInputData {

    firstName: string;
    lastName: string;
    age: number | null;
    countryId: number | null;
    cityId: number | null;
    gender: string;
    email: string;
    id: number | null

    constructor(data: UserInputData) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.countryId = data.countryId;
        this.cityId = data.cityId;
        this.gender = data.gender;
        this.email = data.email;
        this.id = data.id;
    }
};