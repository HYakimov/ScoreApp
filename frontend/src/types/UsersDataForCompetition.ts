import { BasicDto } from "./BasicDto";

export class UsersDataForCompetition {
    value: BasicDto[];

    constructor(data: UsersDataForCompetition) {
        this.value = data.value;
    }
}