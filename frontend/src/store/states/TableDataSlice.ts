import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../types/FormData";
import { TableData } from "../../types/TableData";

const initialState: TableData = {
    tableData: [],
    highlightedRow: -1
};

const TableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        setTableData: (state, action: PayloadAction<FormData[]>) => {
            state.tableData = action.payload;
        },
        sethigHlightedRow: (state, action: PayloadAction<number>) => {
            state.highlightedRow = action.payload;
        },
    },
});

export const { setTableData, sethigHlightedRow } = TableDataSlice.actions;
export default TableDataSlice.reducer;