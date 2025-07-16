import { $fetch } from "../fetch";
export const addFieldMissionAPI = async (field_id: string, payload: any) => {
    try {
        const response = await $fetch.post(`/create-mission/${field_id}`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};
