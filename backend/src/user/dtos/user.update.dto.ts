import { IsEmail, IsNotEmpty } from "class-validator"

export class UserUpdateDto {

    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    age: number;
    @IsNotEmpty()
    countryId: number;
    @IsNotEmpty()
    cityId: number;
    @IsNotEmpty()
    scoreId: number;
    @IsNotEmpty()
    gender: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    id: number;
}