import { UserScoreDto } from "./user.scores.dto";

export class UserScoresResponseDto {

    data: UserScoreDto[];

    static create(users: any): UserScoresResponseDto {
        const record = new UserScoresResponseDto();
        record.data = users.map(user => UserScoreDto.create(user));

        return record;
    }
}