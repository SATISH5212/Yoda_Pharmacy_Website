
import { iFieldQueryParams } from '@/lib/interfaces/maps';
import { getAllRobotsAPI } from '@/lib/services/robots';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import RobotGrid from './robots-grid';
import Pagination from '../core/Pagination';

const AllRobotsPage = () => {
    const navigate = useNavigate();
    const router = useRouter();
    const searchParams = new URLSearchParams(location.search);
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

    const [searchString, setSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );
    const [debounceSearchString, setDebounceSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );

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
        queryKey: [
            "all-fieldsData",
            pagination.page,
            pagination.page_size,
            pagination.order_by,
            pagination.order_type,
            debounceSearchString
        ],
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
                to: "/all-robots",
                search: routerParams,
                replace: true,
            });

            const response = await getAllRobotsAPI(routerParams);
            if (response?.status === 200 || response?.status === 201) {
                return response.data;
            }
            throw new Error("Failed to fetch robots");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });

    const getData = (params: any) => {
        const newPagination = {
            page: params.page || 1,
            page_size: params.page_size || 10,
            order_by: params.order_by || null,
            order_type: params.order_type || null,
        };

        setPagination(newPagination);

        const newSearchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                newSearchParams.set(key, String(value));
            }
        });

        router.navigate({
            to: "/robots",
            search: Object.fromEntries(newSearchParams.entries()),
            replace: true,
        });
    };

    if (isLoading) return <p>Loading robots...</p>;

    const data = allFieldsData?.data;
    if (!data) return <p>No data available</p>;

    const paginationDetails = data?.pagination_info;

    const capturePageNum = (value: number) => {
        getData({
            page: value,
            page_size: pagination.page_size,
            order_by: pagination.order_by,
            order_type: pagination.order_type,
            search_string: debounceSearchString,
        });
    };

    const captureRowPerItems = (value: number) => {
        getData({
            page: 1,
            page_size: value,
            order_by: pagination.order_by,
            order_type: pagination.order_type,
            search_string: debounceSearchString,
        });
    };

    return (
        <div className="flex flex-col h-screen">
            <div className=" flex  justify-between bg-gray-200 rounded p-2 sm:p-3 md:p-4 mb-2 flex-shrink-0 h-10 mx-2 mt-1">

                <div className=" flex items-center gap-1 ">
                    <span className="text-sm">Total Robots :</span>
                    <span className="text-sm">{data.pagination_info.total_records}</span>
                </div>
                <div className="flex items-center">
                    <button
                        className=" bg-green-600 border border rounded text-sm px-2 py-1 text-white"
                        onClick={() =>
                            navigate({
                                to: "/add-robot",
                            })}
                    >
                        + New Robot
                    </button>
                </div>

            </div>
            <div className="flex-1 min-h-0 mb-2 mx-2">
                <RobotGrid robots={data.records} />
            </div>
            <div className="border-t border-gray-200 pt-2 sm:pt-3 md:pt-4 flex-shrink-0">
                <Pagination
                    paginationDetails={paginationDetails}
                    capturePageNum={capturePageNum}
                    captureRowPerItems={captureRowPerItems}
                />
            </div>
        </div>
    );
};

export default AllRobotsPage;
