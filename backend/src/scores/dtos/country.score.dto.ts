export class CountryScoreDto {

    countryId: number;
    countryName: string;
    averageScore: number;

    constructor(data: any) {
        this.countryId = data.countryId;
        this.averageScore = data.averageScore;
        this.countryName = data.countryName;
    }

    static create(data: any): CountryScoreDto {
        const record = new CountryScoreDto(data);

        return record;
    }
}