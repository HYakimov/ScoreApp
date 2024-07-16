import { UserDto } from "./user.dto";

export class UserResponseDto {

    data: UserDto[];
    totalCount: number;

    static create(users: any): UserResponseDto {
        const record = new UserResponseDto();
        const usersDto = users.map(user => UserDto.create(user));
        record.data = usersDto;
        record.totalCount = users[0].total ?? 0;

        return record;
    }
}