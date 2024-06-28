import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormData {
    firstName: string;
    lastName: string;
    age: string;
    score: string;
    id: string;
}

const initialState = {
    firstName: '',
    lastName: '',
    age: '',
    score: '',
    id: ''
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