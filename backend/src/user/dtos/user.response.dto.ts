import { CountryService } from "../../countries/country.service"
import { UserDto } from "./user.dto";

export class UserResponseDto {

    data: UserDto[];
    totalCount: number;

    static create(users: any, totalCount: number): UserResponseDto {
        const record = new UserResponseDto();
        const usersDto = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            email: user.email,
            avatarPath: user.avatarPath,
            cityId: user.cityId,
            cityName: CountryService.getCityName(user.cityId),
            countryId: user.countryId,
            countryName: user.countryName,
            scoreValue: user.scoreValue,
            scoreId: user.scoreId
        }));
        record.data = usersDto;
        record.totalCount = totalCount;

        return record;
    }
}