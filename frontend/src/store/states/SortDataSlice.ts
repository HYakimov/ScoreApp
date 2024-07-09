import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortData } from "../../types/SortData";

const initialState: SortData = {
    value: ''
}

const SortDataSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { setSort } = SortDataSlice.actions;
export default SortDataSlice.reducer;