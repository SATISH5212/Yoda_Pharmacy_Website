export interface FormValues {
    first_name: any;
    last_name: any;
    phone: any;
    email: string;
    password: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}
interface ServerErrorData {
    success: boolean;
    status: number;
    message: string;
    data: any;
    errors: Record<string, string[]>;
}

export interface ServerError {
    status: number;
    success: boolean;
    message?: string;
    data: ServerErrorData;
}

export interface ValidationErrors {
    [key: string]: string[];
}

export interface SignUpPayload {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}


export interface missionFormValues {
    mission_name: string;     
    robot_id: number;
    field_id: number;   
    mission_type?: string;
    buffer_zone_width: string;
    row_spacing: string;
}