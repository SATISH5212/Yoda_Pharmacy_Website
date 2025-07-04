import { getAllFieldsAPI } from "@/lib/services/fields";
import { FieldResponse } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { allFieldsColumns } from "./AllFieldsColumns";
import { iFieldQueryParams } from "@/lib/interfaces/maps";
import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const FieldsTable = () => {
    const router = useRouter();
    const searchParams = new URLSearchParams(location.search);
    const [searchString, setSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );
    const [debounceSearchString, setDebounceSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );
    const [pagination, setPagination] = useState<{
        page: number | string;
        page_size: number | string;
        order_by: string | null;
        order_type: string | null;
    }>({
        page: Number(searchParams.get("page")) || 1,
        page_size: Number(searchParams.get("page_size")) || 10,
        order_by: searchParams.get("order_by") || null,
        order_type: searchParams.get("order_type") || null,
    });
    useEffect(() => {
        const currentSearchParams = new URLSearchParams(location.search);
        setPagination({
            page: Number(currentSearchParams.get("page")) || 1,
            page_size: Number(currentSearchParams.get("page_size")) || 10,
            order_by: currentSearchParams.get("order_by") || null,
            order_type: currentSearchParams.get("order_type") || null,
        });
    }, [location.search]);

    const {
        data: allFieldsData,
        refetch,
        isLoading
    } = useQuery({
        queryKey: ["all-fieldsData", pagination, debounceSearchString],
        queryFn: async () => {
            let queryParams: iFieldQueryParams = {
                page: pagination.page,
                page_size: pagination.page_size,
                order_by: pagination.order_by || undefined,
                order_type: pagination.order_type || undefined,
                search_string: debounceSearchString || undefined,
            };
            const routerParams = {
                ...queryParams,
            };
            router.navigate({
                to: "/fields",
                search: routerParams,
                replace: true,
            });
            const response = await getAllFieldsAPI(routerParams);
            if (response?.status === 200 || response?.status === 201) {
                console.log("fields table data",response.data);
                
                return response.data;
            }
            throw new Error("Failed to fetch gateways");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });
    const getData = (params: any) => {
        setPagination({
            page: params.page || 1,
            page_size: params.page_size || 10,
            order_by: params.order_by || null,
            order_type: params.order_type || null,
        });
        const newSearchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                newSearchParams.set(key, String(value));
            }
        });
        router.navigate({
            to: "/fields",
            search: Object.fromEntries(newSearchParams.entries()),
            replace: true,
        });
    };

    const data = allFieldsData?.data?.records?.map((field: FieldResponse) => ({
        ...field,
        field_area: field.field_area || "2.4",
        field_status: field.field_status === "pending" ? "Active" : field.field_status,
    })) || [];

    return (
        <TanStackTable
            columns={allFieldsColumns}
            data={data}
            paginationDetails={allFieldsData?.data?.pagination_info || {}}
            loading={isLoading}
            heightClass="h-[400px]"
            removeSortingForColumnIds={[]}
            getData={getData}
        />
    );
};

export default FieldsTable;