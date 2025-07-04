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
        const response = await $fetch.post("/register", payload);
        return response;
    } catch (err) {
        throw err;
    }
};


export const CreateMissionAPI = async (payload: {
    mission_name: string;
    mission_type:string;
    robot_id: number;
    field_id: number;
    buffer_zone_width: string;
    row_spacing: string;
}) => {
    try {
        const response = await $fetch.post("/add-missionconfig", payload);
        return response;
    } catch (err) {
        throw err;
    }
};


export const RobotsAPI = async (data: any) => {
    try {
        const response = await $fetch.get("/robots");
        return response;
    } catch (err) {
        throw err;
    }
};

export const FieldsAPI = async () => {
    try {
        const response = await $fetch.get("/fields");
        return response;
    } catch (err) {
        throw err;
    }
};