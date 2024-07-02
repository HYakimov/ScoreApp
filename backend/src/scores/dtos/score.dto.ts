import { IsNotEmpty } from "class-validator";
import { Score } from "../score.entity"

export class ScoreDto {

    id: number;
    @IsNotEmpty()
    value: number;
    @IsNotEmpty()
    userId: number;

    static create(score: Score): ScoreDto {
        const record = new ScoreDto();
        record.id = score.id;
        record.value = score.value;
        record.userId = score.user.id;

        return record;
    }
}