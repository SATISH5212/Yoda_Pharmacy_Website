import { Coordinates } from "@/types/dataTypes";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
export interface FormData {
    field_name: string;

}

export interface iFieldQueryParams {
    stats_tab?: string;
    user?: string;
    company_document_id?: string;
    page: number | string;
    page_size: number | string;
    order_by?: string | undefined;
    order_type?: string | undefined;
    search_string?: string;
    status?: string | null;
    contact_type_id?: string;
    contact_type?: string;
    company_id?: string;
    response_id?: string;
    type?: string | null;
    date?: string;
    tab?: string;
    total?: number;
    responseId?: string;
    action?: string;
    email?: string;
    include_inprogress?: boolean;
    type_status?: string;
    field_status?: string
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
    handleRobotHome: () => void;
    robotHome: Coordinates | null;
    handleCancel: () => void;
    errorMessages: any

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


export interface PolygonOptions {
    fillColor: string;
    strokeColor: string;
    strokeWeight: number;
    clickable: boolean;
    editable: boolean;
    draggable: boolean;
}
