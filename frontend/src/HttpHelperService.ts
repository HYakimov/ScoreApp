import { paginationLimit } from "./constants/PaginationConstants";
import { FormData } from './components/UserRegistrationFormComponent';
import HttpService from "./HttpService";
import { ScoreData } from "./components/ScoresFormComponent";

const users = `/users`;
const scores = `/scores`;
const cities = `/cities`;
const countries = `/countries`;

const HttpHelperService = {

    get: async (page: number, currentSortBy: string) => {
        let url = `${users}/paginated?page=${page}&limit=${paginationLimit}`;
        if (currentSortBy) {
            url += `&sortBy=${currentSortBy}`;
        }
        return await HttpService.get(url);
    },

    getUsers: async () => {
        return await HttpService.get(users);
    },

    getCountries: async () => {
        return await HttpService.get(countries);
    },

    getCities: async (countryId: number) => {
        return await HttpService.get(`${cities}/${countryId}`);
    },

    submit: async (formData: FormData) => {
        if (formData.id != null) {
            await HttpService.put(`${users}/${formData.id}`, formData);
        } else {
            await HttpService.post(users, formData);
        }
    },

    submitScore: async (scoreData: ScoreData) => {
        if (scoreData.id != null) {
            await HttpService.put(`${scores}/${scoreData.id}`, scoreData);
        } else {
            await HttpService.post(scores, scoreData);
        }
    },

    delete: async () => {
        await HttpService.delete(users);
    },

    deleteById: async (id: number) => {
        await HttpService.deleteById(`${users}/${id}`);
    },

    downloadCsv: async (page: number, limit: number, sortBy: string) => {
        return await HttpService.download(`/download/csv?page=${page}&limit=${limit}&sortBy=${sortBy}`);
    }
}

export default HttpHelperService;