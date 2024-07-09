import { IsEmail, IsNotEmpty, Matches } from "class-validator"
import { STRING_REGEX, AGE_REGEX, NUMERIC_REGEX, GENDER_REGEX } from "src/constants";

export class UserInputDto {

    @IsNotEmpty()
    @Matches(STRING_REGEX, { message: 'First Name should contain alphabetic characters only' })
    firstName: string;
    @IsNotEmpty()
    @Matches(STRING_REGEX, { message: 'Last Name should contain alphabetic characters only' })
    lastName: string;
    @IsNotEmpty()
    @Matches(AGE_REGEX, { message: 'Age must be a number between 1 and 150' })
    age: number;
    @IsNotEmpty()
    @Matches(NUMERIC_REGEX, { message: 'countryId must be a number' })
    countryId: number;
    @IsNotEmpty()
    @Matches(NUMERIC_REGEX, { message: 'cityId must be a number' })
    cityId: number;
    @IsNotEmpty()
    @Matches(GENDER_REGEX, { message: 'Gender must be either male or female' })
    gender: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}