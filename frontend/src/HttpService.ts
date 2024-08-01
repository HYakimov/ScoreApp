import { DELETE, GET, POST, PUT, baseUrl, jsonHeader } from './constants/HttpConstants';
import { ScoreData } from './types/ScoreData';

const HttpService = {

    get: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(JSON.stringify(responseData));
            }
            return await responseData;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    },

    post: async (url: string, data: ScoreData) => {
        const response = await fetch(`${baseUrl}${url}`, {
            method: POST,
            headers: jsonHeader,
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(responseData));
        }
    },

    postData: async (url: string, data: FormData) => {
        const response = await fetch(`${baseUrl}${url}`, {
            method: POST,
            body: data
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(responseData));
        }
    },

    put: async (url: string, data: ScoreData) => {
        const response = await fetch(`${baseUrl}${url}`, {
            method: PUT,
            headers: jsonHeader,
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(responseData));
        }
    },

    putData: async (url: string, data: FormData) => {
        const response = await fetch(`${baseUrl}${url}`, {
            method: PUT,
            body: data
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(responseData));
        }
    },

    delete: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: DELETE,
                headers: jsonHeader
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(JSON.stringify(responseData));
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    },

    deleteById: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: DELETE,
                headers: jsonHeader
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(JSON.stringify(responseData));
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    },

    download: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: GET,
                headers: jsonHeader,
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(JSON.stringify(responseData));
            }
            return await response.text();
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }
};

export default HttpService;