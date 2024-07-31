export class CountryScoreDto {

    countryId: number;
    averageScore: number;
    
    constructor(data: any) {
        this.countryId = data.countryId;
        this.averageScore = data.averageScore;
    }

    static create(data: any): CountryScoreDto {
        const record = new CountryScoreDto(data);

        return record;
    }
}