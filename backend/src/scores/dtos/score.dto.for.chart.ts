import { CountryScoreDto } from "./country.score.dto";

export class ScoreDtoForChart {

    competitionId: number;
    scores: CountryScoreDto[];

    static create(data: any): ScoreDtoForChart {
        const record = new ScoreDtoForChart();
        record.competitionId = data.competitionId;
        record.scores = data.scores.map(score => CountryScoreDto.create(score));

        return record;
    }
}