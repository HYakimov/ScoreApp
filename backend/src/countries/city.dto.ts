export class CityDto {
    id: number;
    name: string;
    countryId: number;

    static create(id: number, name: string, countryId: number): CityDto {
        const record = new CityDto();
        record.id = id;
        record.name = name;
        record.countryId = countryId;
        return record;
    }
}