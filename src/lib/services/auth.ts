import { $fetch } from "../fetch";

export const loginAPI = async (payload: {
    email: string;
    password: string;
}) => {
    try {
        const response = await $fetch.post("/login", payload);
        return response;
    } catch (err) {
        throw err;
    }
};

export const SignUpAPI = async (payload: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await $fetch.post("/signup", payload);
        return response;
    } catch (err) {
        throw err;
    }
};