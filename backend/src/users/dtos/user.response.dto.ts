import { UserDto } from "./user.dto";

export class UserResponseDto {

    data: UserDto[];
    totalCount: number;

    static create(users: any, totalCount: number): UserResponseDto {
        const record = new UserResponseDto();
        const usersDto = users.map(user => UserDto.create(user));
        record.data = usersDto;
        record.totalCount = totalCount;

        return record;
    }
}