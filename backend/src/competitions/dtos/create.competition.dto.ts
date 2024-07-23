import { IsNotEmpty } from "class-validator";
import { Country } from "src/countries/country.entity";

export class CreateCompetitionDto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    countryIds: number[];
}