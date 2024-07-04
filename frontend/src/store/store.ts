import { configureStore } from '@reduxjs/toolkit';
import formReducer from './states/formSlice'
import tableDataReducer from './states/tableSlice';
import pageReducer from './states/pageSlice';
import sortReducer from './states/sortSlice';
import countriesReducer from './states/countriesSlice';
import citiesReducer from './states/citiesSlice';
import scoreReducer from './states/scoreSlice';
import usersReducer from './states/usersSlice';
import loaderReducer from './states/loadingSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
        table: tableDataReducer,
        page: pageReducer,
        sort: sortReducer,
        countries: countriesReducer,
        cities: citiesReducer,
        score: scoreReducer,
        users: usersReducer,
        loader: loaderReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;