import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../components/FormComponent";

const initialState = {
    firstName: '',
    lastName: '',
    age: '',
    score: '',
    gender: '',
    country: '',
    city: '',
    id: '',
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