import { Coordinates } from "@/types/dataTypes";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
export interface FormData {
    field_name: string;
}

export interface IFieldFormPageProps {
    handleSubmit: UseFormHandleSubmit<FormData>;
    onSubmit: SubmitHandler<FormData>;
    register: UseFormRegister<FormData>;
    isPending: boolean;
    errors: FieldErrors<FormData>;
    displayArea: string;
    handleAddAccessPoint: () => void;
    fieldAccessPoint: Coordinates | null;
    isSubmittable: boolean | string;
    handleCancel: () => void;
}


export interface FieldData {
    field_access_point: Coordinates;
    field_boundary: Coordinates[];
    field_name?: string;
    field_area?: string;
    location?: string;
}

export interface IViewFieldPageProps {
    fieldData?: FieldData;
}