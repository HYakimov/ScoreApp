export class ScoreData {
    id: number | null
    value: number | null;
    competitionId: number | null;
    userId: number | null;

    constructor(data: ScoreData) {
        this.id = data.id;
        this.value = data.value;
        this.competitionId = data.competitionId;
        this.userId = data.userId;
    }
}