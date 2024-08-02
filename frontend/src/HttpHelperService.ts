import { users, countries, cities, scores, competitions, downloadCsv } from "./constants/HttpPathConstants";
import { paginationLimit } from "./constants/PaginationConstants";
import HttpService from "./HttpService";
import { ScoreData } from "./types/ScoreData";

const HttpHelperService = {

    get: async (page: number, currentSortBy: string) => {
        let url = `${users}/paginated?page=${page}&limit=${paginationLimit}`;
        if (currentSortBy) {
            url += `&sortBy=${currentSortBy}`;
        }
        return await HttpService.get(url);
    },

    getDataForCharts: async () => {
        return await HttpService.get(scores);
    },

    getCountries: async () => {
        return await HttpService.get(countries);
    },

    getCities: async (countryId: number) => {
        return await HttpService.get(`${cities}/${countryId}`);
    },

    getCompetitions: async () => {
        return await HttpService.get(competitions);
    },

    getUsersForCompetition: async (competitionId: number) => {
        return await HttpService.get(`${users}/forCompetition/${competitionId}`);
    },

    submit: async (userInputData: FormData) => {
        await HttpService.postData(users, userInputData);
    },

    update: async (userId: number, userInputData: FormData) => {
        await HttpService.putData(`${users}/${userId}`, userInputData);
    },

    submitScore: async (scoreData: ScoreData) => {
        await HttpService.post(scores, scoreData);
    },

    delete: async () => {
        await HttpService.delete(users);
    },

    deleteById: async (id: number) => {
        await HttpService.deleteById(`${users}/${id}`);
    },

    downloadCsv: async () => {
        return await HttpService.download(downloadCsv);
    }
}

export default HttpHelperService;