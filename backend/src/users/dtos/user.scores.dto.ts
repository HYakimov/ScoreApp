import { Score } from "src/scores/score.entity";

export class UserScoreDto {

    userId: number;
    scores: Score[];

    static create(user: any): UserScoreDto {
        const record = new UserScoreDto();
        record.scores = user.scores;
        record.userId = user.id;

        return record;
    }
}