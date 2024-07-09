export class CitiesData {
    value: { id: number, name: string }[];

    constructor(data: CitiesData) {
        this.value = data.value
    }
}