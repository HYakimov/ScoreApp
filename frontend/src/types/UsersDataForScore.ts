import { DataForScore } from "./DataForScore";

export class UsersDataForScore {

    scoreData: DataForScore[];

    constructor(data: UsersDataForScore) {
        this.scoreData = data.scoreData;
    }
}