import { ScoreDto } from "./score.dto"
import { Score } from "./score.entity"

export class ScoreWithPaginationDto {
    data: ScoreDto[];
    totalCount: number;

    static create(scores: Score[], totalCount: number): ScoreWithPaginationDto {
        const scoresDto = scores.map(s => ScoreDto.create(s));
        const record = new ScoreWithPaginationDto();
        record.data = scoresDto;
        record.totalCount = totalCount;
        return record;
    }
}