import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PageData } from "../../types/PageData";

const initialState: PageData = {
    value: 1,
    totalPages: 0
}

const PageDataSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        }
    }
})

export const { setPage, setTotalPages } = PageDataSlice.actions;
export default PageDataSlice.reducer;