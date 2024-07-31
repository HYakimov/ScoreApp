export class ChartData {

    countryId: number;
    averageScore: number;

    constructor(data: any) {
        this.countryId = data.countryId;
        this.averageScore = data.averageScore;
    }
}