import { getAllFieldsAPI } from "@/lib/services/fields";
import { FieldResponse } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { allFieldsColumns } from "./AllFieldsColumns";
import { iFieldQueryParams } from "@/lib/interfaces/maps";
import { useState, useEffect, FC } from "react";
import { useRouter } from "@tanstack/react-router";
import { IFieldsTablePageProps } from "@/lib/interfaces/fields";


const FieldsTable: FC<IFieldsTablePageProps> = (props) => {
    const { searchString, searchParams, status } = props
    const router = useRouter();
    const [debounceSearchString, setDebounceSearchString] = useState<string>(searchParams.get("search_string") || "");
    const [pagination, setPagination] = useState<{
        page: number;
        page_size: number;
        order_by: string | null;
        order_type: string | null;
    }>({
        page: Number(searchParams.get("page")) || 1,
        page_size: Number(searchParams.get("page_size")) || 10,
        order_by: searchParams.get("order_by") || null,
        order_type: searchParams.get("order_type") || null,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearchString(searchString);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchString]);

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(location.search);
        setPagination({
            page: Number(currentSearchParams.get("page")) || 1,
            page_size: Number(currentSearchParams.get("page_size")) || 10,
            order_by: currentSearchParams.get("order_by") || null,
            order_type: currentSearchParams.get("order_type") || null,
        });
    }, [location.search]);
    useEffect(() => {
        const urlSearchString = searchParams.get("search_string") || "";
        if (urlSearchString !== debounceSearchString) {
            setDebounceSearchString(urlSearchString);
        }
    }, [searchParams]);

    const {
        data: allFieldsData,
        isLoading
    } = useQuery({
        queryKey: ["all-fieldsData", pagination, debounceSearchString, status],
        queryFn: async () => {
            let queryParams: iFieldQueryParams = {
                page: pagination.page,
                page_size: pagination.page_size,
                order_by: pagination.order_by || undefined,
                order_type: pagination.order_type || undefined,
                search_string: debounceSearchString || undefined,
                field_status: status,
            };
            const cleanParams = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) =>
                    value !== undefined && value !== null && value !== ''
                )
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
        refetchInterval: false,
        refetchOnMount: false,
    });

    const getData = (params: any) => {
        setPagination({
            page: Number(params.page) || 1,
            page_size: Number(params.page_size) || 10,
            order_by: params.order_by || null,
            order_type: params.order_type || null,
        });

        const allParams = {
            page: Number(params.page) || 1,
            page_size: Number(params.page_size) || 10,
            order_by: params.order_by || undefined,
            order_type: params.order_type || undefined,
            ...(debounceSearchString && { search_string: debounceSearchString }),
        };

        const cleanParams = Object.fromEntries(
            Object.entries(allParams).filter(
                ([_, value]) => value !== undefined && value !== null && value !== ""
            )
        );

        router.navigate({
            to: "/all-fields",
            search: cleanParams,
            replace: true,
        });
    };

    const data = allFieldsData?.data?.records?.map((field: FieldResponse) => ({
        ...field,
    })) || [];

    return (
        <div >
            <TanStackTable
                columns={allFieldsColumns}
                data={data}
                paginationDetails={allFieldsData?.data?.pagination_info || {}}
                loading={isLoading}
                removeSortingForColumnIds={["id", "field_area", "missions", "action"]}
                getData={getData}
            />
        </div>
    );
};

export default FieldsTable;