import { configureStore } from '@reduxjs/toolkit';
import formReducer from './states/formSlice'
import tableDataReducer from './states/tableSlice';
import pageReducer from './states/pageSlice';
import sortReducer from './states/sortSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
        table: tableDataReducer,
        page: pageReducer,
        sort: sortReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;