import { Dispatch, SetStateAction } from "react";

export interface IAddMissionFormProps {
    viewFieldData: any;
}
export interface IAddRobotFormProps {
    viewFieldData: any;
    setFetchEstimationsData?: any;
    setPathGeneratored: Dispatch<SetStateAction<boolean>>
}
export interface FieldRowsSettings {
    RowSpacing?: number;
    HeadLandWidth?: number;
    RowPattern: string;
    StepSize?: number;
}