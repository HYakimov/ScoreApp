import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../types/FormData";

const initialState: FormData = {
    firstName: '',
    lastName: '',
    age: null,
    countryName: '',
    countryId: null,
    cityName: '',
    cityId: null,
    gender: '',
    email: '',
    avatarPath: '',
    id: null,
    scoreId: null,
    scoreValue: null,
    competitionId: null
};

export const initialFormDataState: FormData = {
    firstName: '',
    lastName: '',
    age: null,
    countryName: '',
    countryId: null,
    cityName: '',
    cityId: null,
    gender: '',
    email: '',
    avatarPath: '',
    id: null,
    scoreId: null,
    scoreValue: null,
    competitionId: null
};

const FormDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setFormData } = FormDataSlice.actions;
export default FormDataSlice.reducer;