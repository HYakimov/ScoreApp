import { DELETE, GET, POST, PUT, baseUrl, jsonHeader } from './constants/HttpConstants';
import { ScoreData } from './types/ScoreData';

const HttpService = {

    get: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return await response.json();
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            throw error;
        }
    },

    post: async (url: string, data: ScoreData) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: POST,
                headers: jsonHeader,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    },

    postData: async (url: string, data: FormData) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: POST,
                body: data
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    },

    put: async (url: string, data: ScoreData) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: PUT,
                headers: jsonHeader,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    },

    putData: async (url: string, data: FormData) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: PUT,
                body: data
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    },

    delete: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: DELETE,
                headers: jsonHeader
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            throw error;
        }
    },

    deleteById: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: DELETE,
                headers: jsonHeader
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            throw error;
        }
    },

    download: async (url: string) => {
        try {
            const response = await fetch(`${baseUrl}${url}`, {
                method: GET,
                headers: jsonHeader,
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return await response.text();
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            throw error;
        }
    }
};

export default HttpService;