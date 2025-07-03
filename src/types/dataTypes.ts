export interface RobotConfig {
    id?: number,
    robot_uuid: string;
    robot_name: string;
    robot_type: string;
    hardware_version: string;
    software_version: string;
    deploy_id: string;
    firmware_version: string;
    ip_address: string;
    mac_address: string;
    robot_model: string;
}


export interface LoginPayload {
    email: string;
    password: string;
}


export type Coordinates = {
    lat: number,
    lng: number
} | null;


export type LocationInfo = {
    location: string;
    area: string;
    centroid: Coordinates;

} | null;

export interface AppProps {
    setField: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FieldFormProps {
    setField: React.Dispatch<React.SetStateAction<boolean>>;
    formCoordinates: { lat: number; lng: number }[];
    fieldAccessPoint: Coordinates;
    // robotHome: Coordinates;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    locationInfo: LocationInfo;
}



export interface AuthSwitchProps {
    onSwitch: () => void;
}

export interface DrawToolsProps {
    setFormCoordinates: (coords: { lat: number; lng: number }[]) => void;
    setFieldAccessPoint: React.Dispatch<React.SetStateAction<Coordinates>>;
    // setRobotHome: React.Dispatch<React.SetStateAction<Coordinates>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfo>>;
}

export interface AddRobotProps {
    onBack: () => void;
}


export interface PaginationInfo {
    total_records: number;
    total_pages: number;
    page: number;
    page_size: number;
}

export interface FieldRecord {
    id: number;
    field_name: string;
    field_area: string;
    created_at: string;
    field_status: string;

}

export interface FieldResponse {
    field_status: string;
    field_area: string;
    records: FieldRecord[];
    pagination_info: PaginationInfo;
}