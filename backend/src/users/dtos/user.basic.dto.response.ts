import { UserBasicDto } from "./user.basic.dto";
import { UserScoreDto } from "./user.score.dto";

export class UserBasicDtoResponse {

    data: UserBasicDto[];

    static create(users: any[]): UserBasicDtoResponse {
        const record = new UserBasicDtoResponse();
        record.data = users.map(user => UserBasicDto.create(user));

        return record;
    }
}