import { CountryScoreDto } from "./country.score.dto";

export class ScoreDtoForChart {

    id: number;
    name: string;
    scores: CountryScoreDto[];

    static create(data: any): ScoreDtoForChart {
        const record = new ScoreDtoForChart();
        record.id = data.id;
        record.name = data.name;
        record.scores = data.scores.map(score => CountryScoreDto.create(score));

        return record;
    }
}