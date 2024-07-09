import { IsNotEmpty } from "class-validator";

export class ScoreDto {

    id: number | null;
    @IsNotEmpty()
    value: number;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    competitionId: number;
}