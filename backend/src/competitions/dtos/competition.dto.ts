import { CountryDto } from "src/countries/dtos/country.dto";
import { Competition } from "../competition.entity";

export class CompetitionDto {

    id: number;
    name: string;
    countries: CountryDto[];

    static create(competition: Competition): CompetitionDto {
        const record = new CompetitionDto();
        record.id = competition.id;
        record.name = competition.name;
        record.countries = competition.countries.map(country => CountryDto.create(country));

        return record;
    }
}

