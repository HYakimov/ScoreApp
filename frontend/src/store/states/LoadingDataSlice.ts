import { createSlice } from "@reduxjs/toolkit";
import { LoaderState } from "../../types/LoaderState";

const initialState: LoaderState = {
    loading: false
};

const LoadingDataSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = LoadingDataSlice.actions;
export default LoadingDataSlice.reducer;