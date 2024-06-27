import { paginationLimit } from "./constants/PaginationConstants";
import { FormData } from './App';
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
        if (formData.id != '') {
            await HttpService.put(`${baseUrl}/${formData.id}`, formData);
        } else {
            await HttpService.post(baseUrl, formData);
        }
    }
}

export default HttpHelperService