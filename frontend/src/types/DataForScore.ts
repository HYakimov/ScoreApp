export class DataForScore {

    userId: number | null;
    firstName: string;
    scores: { scoreId: number, scoreValue: number, competitionId: number }[] | null;

    constructor(data: DataForScore) {
        this.userId = data.userId;
        this.firstName = data.firstName;
        this.scores = data.scores;
    }
}