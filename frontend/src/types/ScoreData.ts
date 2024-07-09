export class ScoreData {
    id: number | null
    value: number | null;
    userId: number | null;

    constructor(data: ScoreData) {
        this.id = data.id;
        this.value = data.value;
        this.userId = data.userId;
    }
}