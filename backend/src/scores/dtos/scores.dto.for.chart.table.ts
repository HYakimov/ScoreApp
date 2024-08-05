import { ScoreDtoForChartTable } from "./score.dto.for.chart.table";

export class ScoresDtoForChartTable {

    data: ScoreDtoForChartTable[];

    static create(data: any) {
        const scores = new ScoresDtoForChartTable();
        scores.data = data.map(score => ScoreDtoForChartTable.create(score));

        return scores;
    }
}