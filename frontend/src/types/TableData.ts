import { FormData } from "./FormData";

export class TableData {
    tableData: FormData[];
    highlightedRow: number;

    constructor(data: TableData) {
        this.tableData = data.tableData;
        this.highlightedRow = data.highlightedRow;
    }
}