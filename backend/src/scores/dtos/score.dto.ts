import { IsNotEmpty, Matches } from "class-validator";
import { SCORE_REGEX } from "src/constants";

export class ScoreDto {

    id: number | null;
    @IsNotEmpty()
    @Matches(SCORE_REGEX, { message: 'Score must be a number between 1 and 100' })
    value: number;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    competitionId: number;
}