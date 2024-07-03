import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../components/UserRegistrationFormComponent";

export const initialState: FormData = {
    firstName: '',
    lastName: '',
    age: null,
    scoreId: null,
    scoreValue: null,
    countryName: '',
    countryId: null,
    cityName: '',
    cityId: null,
    gender: '',
    email: '',
    id: null,
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setFormData } = formDataSlice.actions;
export default formDataSlice.reducer;