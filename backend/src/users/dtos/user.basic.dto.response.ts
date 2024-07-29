import { UserBasicDto } from "./user.basic.dto";

export class UserBasicDtoResponse {

    data: UserBasicDto[];

    static create(users: any[]): UserBasicDtoResponse {
        const record = new UserBasicDtoResponse();
        record.data = users.map(user => UserBasicDto.create(user));

        return record;
    }
}