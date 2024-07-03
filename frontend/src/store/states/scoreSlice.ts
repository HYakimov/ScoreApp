import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScoreData } from "../../components/ScoresFormComponent";

export const initialState: ScoreData = {
    id: null,
    value: null,
    userId: null
}

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<Partial<ScoreData>>) => {
            return { ...state, ...action.payload };
        }
    }
})

export const { setScore } = scoreSlice.actions;
export default scoreSlice.reducer;