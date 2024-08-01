export class ScoreDtoForChart {

    scoreId: number;
    scoreValue: number;
    competitionId: number;

    static create(score: any): ScoreDtoForChart {
        const record = new ScoreDtoForChart();
        record.scoreId = score.id;
        record.scoreValue = score.value;
        record.competitionId = score.competition.id;

        return record;
    }
}