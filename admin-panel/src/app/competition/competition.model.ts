import { Country } from "./country.model";

export class Competition {
    name: string;
    id: number;
    countries: Country[] = [];

    constructor(name: string, id: number, countries: Country[]) {
        this.name = name;
        this.id = id;
        this.countries = countries;
    }
}  