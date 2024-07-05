import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface FormData {
    firstName: string;
    lastName: string;
    age: number | null;
    scoreId: number | null;
    scoreValue: number | null;
    countryName: string;
    countryId: number | null;
    cityName: string;
    cityId: number | null;
    gender: string;
    email: string;
    avatarPath: string;
    id: number | null;
}

const initialState: FormData = {
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
    avatarPath: '',
    id: null,
};

export const initialFormDataState: FormData = {
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
    avatarPath: '',
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