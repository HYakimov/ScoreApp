import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Page {
    value: number;
    totalPages: number;
}

const initialState: Page = {
    value: 1,
    totalPages: 0
}

const pageSlice = createSlice({
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

export const { setPage, setTotalPages } = pageSlice.actions;
export default pageSlice.reducer;