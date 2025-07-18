
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
    capturePageNum: (page: number) => void;
    captureRowPerItems: (limit: number) => void;
    initialPage?: number;
    limitOptionsFromProps?: { title: string; value: number }[];
    paginationDetails: {
        page?: number;
        page_size?: number;
        total_pages?: number;
        total_records?: number;
    };
    data?: any[];
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