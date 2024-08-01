import { ChartData } from "./ChartData";

export class ChartComponentProps {

    competitionId: number;
    competitionName: string;
    scores: ChartData[];

    constructor(competitionId: number, competitionName: string, scores: any[]) {
        this.competitionId = competitionId;
        this.competitionName = competitionName;
        this.scores = scores.map(data => new ChartData(data));
    }
}