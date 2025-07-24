
import { $fetch } from "../fetch";
export const generateChatAPI = async (payload?: any) => {
    try {
        const response = await $fetch.post(`/prompt`);
        return response;
    } catch (err) {
        throw err;
    }
};