
import { $fetch } from "../fetch";
import { iFieldQueryParams } from "../interfaces/maps";
export const addRobotDataAPI = async (payload: any) => {
    try {
        const response = await $fetch.post(`/add-robot`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};


export const getAllRobotsAPI = async (queryParams: iFieldQueryParams) => {
    try {
        const response = await $fetch.get("/robots", queryParams);
        return response;
    } catch (err) {
        throw err;
    }
};