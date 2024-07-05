import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInputData {
    firstName: string;
    lastName: string;
    age: number | null;
    countryId: number | null;
    cityId: number | null;
    gender: string;
    email: string;
};

export const initialState: UserInputData = {
    firstName: '',
    lastName: '',
    age: null,
    countryId: null,
    cityId: null,
    gender: '',
    email: ''
};

const userInputData = createSlice({
    name: 'UserInputData',
    initialState,
    reducers: {
        setUserInputData: (state, action: PayloadAction<Partial<UserInputData>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setUserInputData } = userInputData.actions;
export default userInputData.reducer;