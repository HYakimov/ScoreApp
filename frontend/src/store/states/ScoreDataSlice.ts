import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScoreData } from "../../types/ScoreData";

export const initialState: ScoreData = {
    value: null,
    competitionId: null,
    userId: null
}

const ScoreDataSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<ScoreData>) => {
            return { ...state, ...action.payload };
        }
    }
})

export const { setScore } = ScoreDataSlice.actions;
export default ScoreDataSlice.reducer;