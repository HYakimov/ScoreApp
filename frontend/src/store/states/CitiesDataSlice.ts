import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CitiesData } from "../../types/CitiesData";

const initialState: CitiesData = {
    value: []
}

const CityDataSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
            state.value = action.payload;
        },
    }

})

export const { setCities } = CityDataSlice.actions;
export default CityDataSlice.reducer;