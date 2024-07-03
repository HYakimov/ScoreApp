import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../components/UserRegistrationFormComponent";

interface TableData {
    tableData: FormData[];
    highlightedRow: number;
}

const initialState: TableData = {
    tableData: [],
    highlightedRow: -1
};

const tableDataSlice = createSlice({
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

export const { setTableData, sethigHlightedRow } = tableDataSlice.actions;
export default tableDataSlice.reducer;