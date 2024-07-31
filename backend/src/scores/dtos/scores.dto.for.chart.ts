import { ScoreDtoForChart } from "./score.dto.for.chart";

export class ScoresDtoForChart {

    data: ScoreDtoForChart[];

    static create(rawData: any[]): ScoresDtoForChart {
        const record = new ScoresDtoForChart();
        const groupedData = rawData.reduce((acc: { [key: number]: ScoreDtoForChart }, item) => {
            if (!acc[item.competitionId]) {
                acc[item.competitionId] = {
                    competitionId: item.competitionId,
                    scores: []
                };
            }

            acc[item.competitionId].scores.push({
                countryId: item.countryId,
                averageScore: parseFloat(item.averageScore)
            });

            return acc;
        }, {});

        const scoreDtos = Object.values(groupedData).map(data => ScoreDtoForChart.create(data));
        record.data = scoreDtos;

        return record;
    }
}