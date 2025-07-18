import { getAllFieldsAPI } from "@/lib/services/fields";
import { FieldResponse } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";
import { iFieldQueryParams } from "@/lib/interfaces/maps";
import { useState, useEffect, FC } from "react";
import { useRouter, useLocation } from "@tanstack/react-router";
import { IFieldsTablePageProps } from "@/lib/interfaces/fields";
import TanStackTable from "../core/TanstackTable";
import { useViewAllFieldsColumns } from "./AllFieldsColumns";

const FieldsTable: FC<IFieldsTablePageProps> = (props) => {
    const { searchString, searchParams, status } = props;
    const [allFieldsColumns] = useViewAllFieldsColumns();
    const router = useRouter();
    const [debounceSearchString, setDebounceSearchString] = useState<string>(searchParams.get("search_string") || "");
    const [pagination, setPagination] = useState<{
        page: number;
        page_size: number;
        order_by: string | null;
        order_type: string | null;
    }>({
        page: Number(searchParams.get("page")) || 1,
        page_size: Number(searchParams.get("page_size")) || 25,
        order_by: searchParams.get("order_by") || null,
        order_type: searchParams.get("order_type") || null,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearchString(searchString);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchString]);

    const { data: allFieldsData, isLoading } = useQuery({
        queryKey: ["all-fieldsData", pagination, debounceSearchString, status],
        queryFn: async () => {
            const queryParams: iFieldQueryParams = {
                page: pagination.page,
                page_size: pagination.page_size,
                order_by: pagination.order_by || undefined,
                order_type: pagination.order_type || undefined,
                search_string: debounceSearchString || undefined,
                field_status: status,
            };
            const cleanParams = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== "")
            );
            router.navigate({
                to: "/all-fields",
                search: cleanParams,
                replace: true,
            });

            const response = await getAllFieldsAPI(queryParams);
            if (response?.status === 200 || response?.status === 201) {
                return response.data;
            }
            throw new Error("Failed to fetch fields");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
        retry: false,
        refetchOnMount: true,
    });

    const getData = (params: any) => {
        setPagination({
            page: Number(params.page) || 1,
            page_size: Number(params.page_size) || 25,
            order_by: params.order_by || null,
            order_type: params.order_type || null,
        });
    };

    const data = allFieldsData?.data?.records?.map((field: FieldResponse) => ({
        ...field,
    })) || [];

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <TanStackTable
                columns={allFieldsColumns}
                data={data}
                paginationDetails={{
                    ...allFieldsData?.data?.pagination_info,
                    page: pagination.page,
                }}
                loading={isLoading}
                removeSortingForColumnIds={["id", "field_area", "missions", "action"]}
                getData={getData}
                noDataLabel="No fields found"
            />
        </div>
    );
};

export default FieldsTable;