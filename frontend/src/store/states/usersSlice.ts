import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../components/UserRegistrationFormComponent";

interface Users {
    users: FormData[];
}

const initialState: Users = {
    users: []
};

const usersDataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<FormData[]>) => {
            state.users = action.payload;
        }
    }
});

export const { setUsers } = usersDataSlice.actions;
export default usersDataSlice.reducer;