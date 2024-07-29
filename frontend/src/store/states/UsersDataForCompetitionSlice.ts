import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicDto } from "../../types/BasicDto";
import { UsersDataForCompetition } from "../../types/UsersDataForCompetition";

const initialState: UsersDataForCompetition = {
    value: []
};

const UsersDataForCompetitionSlice = createSlice({
    name: 'usersDataForCompetition',
    initialState,
    reducers: {
        setUsersDataForCompetition: (state, action: PayloadAction<BasicDto[]>) => {
            state.value = action.payload;
        }
    }
});

export const { setUsersDataForCompetition } = UsersDataForCompetitionSlice.actions;
export default UsersDataForCompetitionSlice.reducer;