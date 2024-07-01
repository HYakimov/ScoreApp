import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Cities {
    value: { id: number, name: string }[];
}

const initialState: Cities = {
    value: []
}

const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
            state.value = action.payload;
        },
    }

})

export const { setCities } = citySlice.actions;
export default citySlice.reducer;