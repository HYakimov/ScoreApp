export class CountryScoreDto {

    id: number;
    name: string;
    averageScore: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.averageScore = data.averageScore;
    }

    static create(data: any): CountryScoreDto {
        const record = new CountryScoreDto(data);

        return record;
    }
}