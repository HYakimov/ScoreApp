import { UserDto } from "./user.dto";
import { User } from "../user.entity";

export class UserPaginationDto {

    data: UserDto[];
    totalCount: number;

    static create(users: User[], totalCount: number): UserPaginationDto {
        const usersDto = users.map(u => UserDto.create(u));
        const record = new UserPaginationDto();
        record.data = usersDto;
        record.totalCount = totalCount;

        return record;
    }
}