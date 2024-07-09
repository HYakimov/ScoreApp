export class CompetitionsData {
    value: { id: number; name: string }[];

    constructor(data: CompetitionsData) {
        this.value = data.value;
    }
}