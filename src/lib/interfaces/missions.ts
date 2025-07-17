import { Dispatch, SetStateAction } from "react";

export interface IAddMissionFormProps {
    viewFieldData: any;
}
export interface IAddRobotFormProps {
    viewFieldData: any;
    setFetchEstimationsData?: any;
    setPathGeneratored: Dispatch<SetStateAction<boolean>>
    robotType: string
    setRobotType: Dispatch<SetStateAction<string>>
}
export interface FieldRowsSettings {
    RowSpacing?: number;
    HeadLandWidth?: number;
    RowPattern: string;
    StepSize?: number;
}