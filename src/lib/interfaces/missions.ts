import { Dispatch, SetStateAction } from "react";

export interface IAddMissionFormProps {
    viewFieldData: any;
    setShowAddMissionPage: Dispatch<SetStateAction<boolean>>
}
export interface IAddRobotFormProps {
    viewFieldData: any;
    setFetchEstimationsData?: any;
    setPathGeneratored: Dispatch<SetStateAction<boolean>>
    robotType: string
    setRobotType: Dispatch<SetStateAction<string>>
}
export interface IFieldAllMissionsProps {
    viewFieldData: any;
    setFetchEstimationsData?: any;
    setPathGeneratored: Dispatch<SetStateAction<boolean>>
    robotType: string
    setRobotType: Dispatch<SetStateAction<string>>
    setShowAddMissionPage: Dispatch<SetStateAction<boolean>>
    isLoading: boolean


}
export interface FieldRowsSettings {
    RowSpacing?: number;
    HeadLandWidth?: number;
    RowPattern: string;
    StepSize?: number;
}