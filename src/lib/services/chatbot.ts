
import { $fetch } from "../fetch";
export const generateChatAPI = async (payload: any) => {
    try {
        const response = await $fetch.post(`/add-fieldmapping`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};