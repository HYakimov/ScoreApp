import { ScoreDtoForChart } from "src/scores/dtos/score.dto.for.chart";
export class UserScoreDto {

    userId: number;
    firstName: string;
    scores: ScoreDtoForChart[];

    static create(user: any): UserScoreDto {
        const record = new UserScoreDto();
        record.userId = user.id;
        record.firstName = user.firstName;
        record.scores = user.scores.map(score => ScoreDtoForChart.create(score));

        return record;
    }
}