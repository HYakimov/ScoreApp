import { City } from "../city.entity";

export class CityDto {

    id: number;
    name: string;
    countryId: number;

    static create(city: City): CityDto {
        const record = new CityDto();
        record.id = city.id;
        record.name = city.name;
        record.countryId = city.country.id;

        return record;
    }
}