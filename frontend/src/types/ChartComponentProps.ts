import { ChartData } from "./ChartData";

export class ChartComponentProps {

    competitionId: number;
    scores: ChartData[];

    constructor(competitionId: number, scores: any[]) {
        this.competitionId = competitionId;
        this.scores = scores.map(data => new ChartData(data));
    }
}