import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataForScore } from "../../types/DataForScore";
import { UsersDataForScore } from '../../types/UsersDataForScore'

const initialState: UsersDataForScore = {
    scoreData: []
};

const UsersDataForScoreSlice = createSlice({
    name: 'usersDataForScore',
    initialState,
    reducers: {
        setUsersDataForScore: (state, action: PayloadAction<DataForScore[]>) => {
            state.scoreData = action.payload;
        }
    }
});

export const { setUsersDataForScore } = UsersDataForScoreSlice.actions;
export default UsersDataForScoreSlice.reducer;