import { createSelector } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData";
import { CitiesData } from "../../types/CitiesData";
import { CountriesData } from "../../types/CountriesData";
import { UsersData } from "../../types/UserData";
import { UserInputData } from "../../types/UserInputData";
import { SortData } from "../../types/SortData";
import { PageData } from "../../types/PageData";
import { ScoreData } from "../../types/ScoreData";
import { LoaderState } from "../../types/LoaderState";
import { CompetitionsData } from "../../types/CompetitionsData";

const tableDataState = (state: any) => state.table;
const citiesState = (state: any) => state.cities;
const countriesState = (state: any) => state.countries;
const usersState = (state: any) => state.users;
const userInputState = (state: any) => state.userInputData;
const sortState = (state: any) => state.sort;
const pageState = (state: any) => state.page;
const scoreState = (state: any) => state.score;
const loaderState = (state: any) => state.loader;
const competitionsState = (state: any) => state.competitions;

const tableRecordsSelector = createSelector(tableDataState, (state) => new TableData(state).tableData);
const highlightedRowSelector = createSelector(tableDataState, (state) => new TableData(state).highlightedRow);
const citiesRecordsSelector = createSelector(citiesState, (state) => new CitiesData(state).value);
const countriesRecordsSelector = createSelector(countriesState, (state) => new CountriesData(state).value);
const usersSelector = createSelector(usersState, (state) => new UsersData(state.users).users);
const userInputSelector = createSelector(userInputState, (state) => new UserInputData(state));
const sortSelector = createSelector(sortState, (state) => new SortData(state.value).value);
const pageSelector = createSelector(pageState, (state) => new PageData(state).value);
const totalPagesSelector = createSelector(pageState, (state) => new PageData(state).totalPages);
const scoreSelector = createSelector(scoreState, (state) => new ScoreData(state));
const loaderSelector = createSelector(loaderState, (state) => new LoaderState(state.loading).loading);
const competitionsSelector = createSelector(competitionsState, (state) => new CompetitionsData(state).value);

export {
    tableRecordsSelector,
    highlightedRowSelector,
    citiesRecordsSelector,
    countriesRecordsSelector,
    usersSelector,
    userInputSelector,
    sortSelector,
    pageSelector,
    totalPagesSelector,
    scoreSelector,
    loaderSelector,
    competitionsSelector
}