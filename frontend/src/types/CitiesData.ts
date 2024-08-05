import { BasicDto } from "./BasicDto";

export class CitiesData {

    value: BasicDto[];

    constructor(data: CitiesData) {
        this.value = data.value
    }
}