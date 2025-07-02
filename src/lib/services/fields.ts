
import { $fetch } from "../fetch";
export const getAllFieldsAPI = async () => {
    try {
        const response = await $fetch.get("/fieldmappings");
        return response;
    } catch (err) {
        throw err;
    }
};

export const addFieldBoundaryAPI = async (payload: any) => {
    try {
        const response = await $fetch.post(`/add-fieldmapping`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};