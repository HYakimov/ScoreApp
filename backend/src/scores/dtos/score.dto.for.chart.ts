import { CountryScoreDto } from "./country.score.dto";

export class ScoreDtoForChart {

    competitionId: number;
    competitionName: string;
    scores: CountryScoreDto[];

    static create(data: any): ScoreDtoForChart {
        const record = new ScoreDtoForChart();
        record.competitionId = data.competitionId;
        record.competitionName = data.competitionName;
        record.scores = data.scores.map(score => CountryScoreDto.create(score));

        return record;
    }
}