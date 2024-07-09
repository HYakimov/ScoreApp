export class PageData {
    value: number;
    totalPages: number;

    constructor(data: PageData) {
        this.value = data.value;
        this.totalPages = data.totalPages;
    }
}