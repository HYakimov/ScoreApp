import { ScoresController } from "src/scores/scores.controller";

export class UserScoreDto {
    userId: number;
    firstName: string;
    scores: { scoreId: number, scoreValue: number, competitionId: number }[];

    static create(user: any): UserScoreDto {
        const record = new UserScoreDto();
        record.userId = user.id;
        record.firstName = user.firstName;
        record.scores = user.scores.map(score => ({
            scoreId: score.id,
            scoreValue: score.value,
            competitionId: score.competition.id,
        }));

        return record;
    }
}