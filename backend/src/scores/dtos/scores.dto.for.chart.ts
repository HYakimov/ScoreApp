import { ScoreDtoForChart } from "./score.dto.for.chart";

export class ScoresDtoForChart {

    data: ScoreDtoForChart[];

    static create(
        rawData: any[],
        primaryId: string,
        primaryName: string,
        secondaryId: string,
        secondaryName: string
    ): ScoresDtoForChart {
        const record = new ScoresDtoForChart();
        const groupedData: { [key: string]: ScoreDtoForChart } = {};

        rawData.forEach(item => {
            const primaryKeyValue = item[primaryId];
            const primaryValueValue = item[primaryName];
            const secondaryKeyValue = item[secondaryId];
            const secondaryValueValue = item[secondaryName];

            if (!groupedData[primaryKeyValue]) {
                groupedData[primaryKeyValue] = {
                    id: primaryKeyValue,
                    name: primaryValueValue,
                    scores: [{
                        id: secondaryKeyValue,
                        name: secondaryValueValue,
                        averageScore: parseFloat(item.averageScore)
                    }]
                };
            } else {
                groupedData[primaryKeyValue].scores.push({
                    id: secondaryKeyValue,
                    name: secondaryValueValue,
                    averageScore: parseFloat(item.averageScore)
                });
            }
        });

        const scoreDtos = Object.values(groupedData).map(data => ScoreDtoForChart.create(data));
        record.data = scoreDtos;

        return record;
    }
}