import { BasicDto } from "./BasicDto";

export class CountriesData {
    value: BasicDto[];

    constructor(data: CountriesData) {
        this.value = data.value;
    }
}