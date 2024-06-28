import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sort {
    value: string;
}

const initialState: Sort = {
    value: ''
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;