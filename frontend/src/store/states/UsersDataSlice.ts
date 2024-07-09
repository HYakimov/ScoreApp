import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../types/FormData";
import { UsersData } from "../../types/UserData";

const initialState: UsersData = {
    users: []
};

const UsersDataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<FormData[]>) => {
            state.users = action.payload;
        }
    }
});

export const { setUsers } = UsersDataSlice.actions;
export default UsersDataSlice.reducer;