
import { $fetch } from "../fetch";

export const getAllFieldsAPI = async () => {
    try {
        const response = await $fetch.get("/fieldmappings");
        return response;
    } catch (err) {
        throw err;
    }
};
