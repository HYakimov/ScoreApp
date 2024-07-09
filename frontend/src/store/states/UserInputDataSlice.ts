import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInputData } from "../../types/UserInputData";

export const initialState: UserInputData = {
    firstName: '',
    lastName: '',
    age: null,
    countryId: null,
    cityId: null,
    gender: '',
    email: '',
    id: null
};

const UserInputDataSlice = createSlice({
    name: 'UserInputData',
    initialState,
    reducers: {
        setUserInputData: (state, action: PayloadAction<Partial<UserInputData>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setUserInputData } = UserInputDataSlice.actions;
export default UserInputDataSlice.reducer;