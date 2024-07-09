import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompetitionsData } from "../../types/CompetitionsData";

const initialState: CompetitionsData = {
    value: []
};

const CompetitionsDataSlice = createSlice({
    name: 'competitions',
    initialState,
    reducers: {
        setCompetitions: (state, action: PayloadAction<{ id: number; name: string }[]>) => {
            state.value = action.payload;
        },
    }
});

export const { setCompetitions } = CompetitionsDataSlice.actions;
export default CompetitionsDataSlice.reducer;