import { ChartData } from "./ChartData";

export class ChartComponentProps {

    scores: ChartData[];

    constructor(competitionId: number, scores: any[]) {
        this.scores = scores.map(data => new ChartData(data));
    }
}