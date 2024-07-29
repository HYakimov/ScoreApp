import { Country } from "../country.entity";
import { CountryDto } from "./country.dto";

export class CountriesDto {
    data: CountryDto[];

    static create(countries: Country[]): CountriesDto {
        const record = new CountriesDto();
        record.data = countries.map(country => CountryDto.create(country));

        return record;
    }
}

