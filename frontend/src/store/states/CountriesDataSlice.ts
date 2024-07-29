import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CountriesData } from "../../types/CountriesData";
import { BasicDto } from "../../types/BasicDto";

const initialState: CountriesData = {
    value: []
}

const CountriesDataSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries: (state, action: PayloadAction<BasicDto[]>) => {
            state.value = action.payload;
        },
    },
})

export const { setCountries } = CountriesDataSlice.actions;
export default CountriesDataSlice.reducer;