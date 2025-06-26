export interface RobotConfig {
    id? : number,
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
    lat : number,
    lng : number
} | null;


export type LocationInfo = {
    location: string;
    area: string;
} | null;

export interface AppProps {
    setField: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SampleFormProps {
    setField: React.Dispatch<React.SetStateAction<boolean>>;
    formCoordinates: number[][];
    fieldAccessPoint: Coordinates;
    robotHome: Coordinates;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    locationInfo: LocationInfo;
}



export interface AuthSwitchProps {
    onSwitch: () => void;
}

export interface DrawToolsProps {
    setFormCoordinates: React.Dispatch<React.SetStateAction<number[][]>>;
    setFieldAccessPoint: React.Dispatch<React.SetStateAction<Coordinates>>;
    setRobotHome : React.Dispatch<React.SetStateAction<Coordinates>>;
    mode: string,
    setMode: React.Dispatch<React.SetStateAction<string>>;
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfo>>;
}

export interface AddRobotProps{
     onBack:()=>void ;
}
