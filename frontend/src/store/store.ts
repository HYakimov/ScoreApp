import { configureStore } from '@reduxjs/toolkit';
import formReducer from './states/FormDataSlice'
import tableDataReducer from './states/TableDataSlice';
import pageReducer from './states/PageDataSlice';
import sortReducer from './states/SortDataSlice';
import countriesReducer from './states/CountriesDataSlice';
import citiesReducer from './states/CitiesDataSlice';
import scoreReducer from './states/ScoreDataSlice';
import usersReducer from './states/UsersDataSlice';
import loaderReducer from './states/LoadingDataSlice';
import userInputDataReducer from './states/UserInputDataSlice';
import competitionsReducer from './states/CompetitionsDataSlice';
import usersDataForScoreReducer from './states/UsersDataForScoreSlice';
// import dataForScoreReducer from './states/DataForScoreSlice'

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
        loader: loaderReducer,
        userInputData: userInputDataReducer,
        competitions: competitionsReducer,
        usersDataForScore: usersDataForScoreReducer
        // dataForScore: dataForScoreReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;