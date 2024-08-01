import { City } from "../city.entity";
import { CityDto } from "./city.dto";

export class CityResponseDto {

    data: CityDto[];

    static create(cities: City[]): CityResponseDto {
        const record = new CityResponseDto();
        const citiesDto = cities.map(city => CityDto.create(city))
        record.data = citiesDto;

        return record;
    }
}