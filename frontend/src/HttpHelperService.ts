import { paginationLimit } from "./constants/PaginationConstants";
import { FormData } from './components/FormComponent';
import HttpService from "./HttpService";

const baseUrl = '/data';

const HttpHelperService = {

    get: async (page: number, currentSortBy: string) => {
        let url = `${baseUrl}?page=${page}&limit=${paginationLimit}`;
        if (currentSortBy) {
            url += `&sortBy=${currentSortBy}`;
        }
        return await HttpService.fetch(url);
    },

    delete: async () => {
        await HttpService.delete(baseUrl);
    },

    deleteById: async (id: string) => {
        await HttpService.deleteById(`${baseUrl}/${id}`);
    },

    submit: async (formData: FormData) => {
        if (formData.id != undefined) {
            await HttpService.put(`${baseUrl}/${formData.id}`, formData);
        } else {
            await HttpService.post(baseUrl, formData);
        }
    },

    getCountries: async () => {
        return await HttpService.fetch(`/countries`);
    },

    getCities: async (country: string) => {
        return await HttpService.fetch(`/cities/${country}`);
    }
}

export default HttpHelperService