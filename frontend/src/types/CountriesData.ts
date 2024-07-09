export class CountriesData {
    value: { id: number; name: string }[];

    constructor(data: CountriesData) {
        this.value = data.value;
    }
}