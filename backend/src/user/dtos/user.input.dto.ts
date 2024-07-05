import { IsEmail, IsNotEmpty } from "class-validator"

export class UserInputDto {

    // @IsNotEmpty()
    firstName: string;
    // @IsNotEmpty()
    lastName: string;
    // @IsNotEmpty()
    age: number;
    // @IsNotEmpty()
    countryId: number;
    // @IsNotEmpty()
    cityId: number;
    // @IsNotEmpty()
    gender: string;
    // @IsNotEmpty()
    // @IsEmail()
    email: string;
}