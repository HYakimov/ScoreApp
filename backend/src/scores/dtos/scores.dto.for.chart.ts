import { ScoreDtoForChart } from "./score.dto.for.chart";

export class ScoresDtoForChart {

    data: ScoreDtoForChart[];

    static create(rawData: any[]): ScoresDtoForChart {
        const record = new ScoresDtoForChart();
        const groupedData: { [key: number]: ScoreDtoForChart } = {};

        rawData.forEach(item => {
            if (!groupedData[item.competitionId]) {
                groupedData[item.competitionId] = {
                    competitionId: item.competitionId,
                    competitionName: item.competitionName,
                    scores: [{
                        countryId: item.countryId,
                        countryName: item.countryName,
                        averageScore: parseFloat(item.averageScore)
                    }]
                };
            } else {
                groupedData[item.competitionId].scores.push({
                    countryId: item.countryId,
                    countryName: item.countryName,
                    averageScore: parseFloat(item.averageScore)
                })
            }
        });

        const scoreDtos = Object.values(groupedData).map(data => ScoreDtoForChart.create(data));
        record.data = scoreDtos;

        return record;
    }
}