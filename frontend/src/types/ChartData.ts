export class ChartData {

    countryId: number;
    countryName: string;
    averageScore: number;

    constructor(data: any) {
        this.countryId = data.countryId;
        this.countryName = data.countryName;
        this.averageScore = data.averageScore;
    }
}