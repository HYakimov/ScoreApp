import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Countries {
    value: { id: number; name: string }[];
}

const initialState: Countries = {
    value: []
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
            state.value = action.payload;
        },
    },
})

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;