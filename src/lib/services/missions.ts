import { $fetch } from "../fetch";
export const addFieldMissionAPI = async (payload: any) => {
    try {
        const response = await $fetch.post(`/create-mission`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};
