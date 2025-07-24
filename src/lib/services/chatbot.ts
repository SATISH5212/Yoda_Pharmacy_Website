
import { $fetch } from "../fetch";
export const generateChatAPI = async (payload: any) => {
    try {
        const response = await $fetch.post(`/prompt`, payload);
        return response;
    } catch (err) {
        throw err;
    }
};