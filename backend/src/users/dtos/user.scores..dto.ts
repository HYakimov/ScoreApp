import { UserScoreDto } from "./user.score.dto";

export class UserScoresDto {

    data: UserScoreDto[];

    static create(users: any[]): UserScoresDto {
        const record = new UserScoresDto();
        record.data = users.map(user => UserScoreDto.create(user));

        return record;
    }
}