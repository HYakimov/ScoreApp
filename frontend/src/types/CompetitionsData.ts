import { BasicDto } from "./BasicDto";

export class CompetitionsData {

    value: BasicDto[];

    constructor(data: CompetitionsData) {
        this.value = data.value;
    }
}