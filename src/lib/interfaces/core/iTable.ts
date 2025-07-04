
import { Dispatch, SetStateAction } from "react";


export interface iConfirmDialog {
    removeConfirm: boolean;
    setRemoveConfirm: Dispatch<SetStateAction<boolean>>;
    name?: string;
    contactTypes?: string;
    onCancel: () => void;
    onConfirm: () => void;
    isDeleteLoading?: boolean;
    setDeleteReason?: Dispatch<SetStateAction<string>>;
    deleteReason?: string
}


export interface DynamicPaginationProps {
    paginationDetails: any;

    totalItems?: number;
    capturePageNum: (value: number) => void;
    captureRowPerItems: (value: number) => void;
    initialPage?: number;
    limitOptionsFromProps?: { title: string; value: number }[];
}


export interface pageProps {
    columns: any[];
    data: any[];
    loading?: boolean;
    heightClass?: string;
    getData?: any;
    paginationDetails: any;
    removeSortingForColumnIds?: string[];
    noDataLabel?: string
}