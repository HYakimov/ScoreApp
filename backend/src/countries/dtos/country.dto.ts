import { Country } from "../country.entity";

export class CountryDto {
    id: number;
    name: string;

    static create(country: Country): CountryDto {
        const record = new CountryDto();
        record.id = country.id;
        record.name = country.name;

        return record;
    }
}

