export class ScoreDtoForChartTable {

    competitionId: number;
    competitionName: string;
    userId: number;
    fullName: string;
    age: number;
    maxScore: number;

    static create(data: any) {
        const score = new ScoreDtoForChartTable();
        score.competitionId = data.competitionId;
        score.competitionName = data.competitionName;
        score.userId = data.userId;
        score.fullName = data.fullName;
        score.age = data.age;
        score.maxScore = data.maxScore;

        return score;
    }
}
