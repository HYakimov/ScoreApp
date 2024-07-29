export class ScoreData {

    value: number | null;
    competitionId: number | null;
    userId: number | null;

    constructor(data: ScoreData) {
        this.value = data.value;
        this.competitionId = data.competitionId;
        this.userId = data.userId;
    }
}