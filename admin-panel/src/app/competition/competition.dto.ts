import { Country } from "./country.model";

export class CompetitionDto {
    name: string;
    countryIds: number[];

    constructor(name: string, countryIds: number[]) {
        this.name = name;
        this.countryIds = countryIds;
    }
}  