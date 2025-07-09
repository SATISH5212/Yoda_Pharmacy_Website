
import { iFieldQueryParams } from '@/lib/interfaces/maps';
import { getAllRobotsAPI } from '@/lib/services/robots';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Pagination from '../core/Pagination';
import AllRobotsCards from './AllRobotsCards';
import { Search } from 'lucide-react';

const AllRobotsPage = () => {
    const navigate = useNavigate();
    const router = useRouter();
    const searchParams = new URLSearchParams(location.search);
    // const [robot_type, setRobotType] = useState<string>( searchParams.get("robot_type") || "" );
     const [searchString, setSearchString] = useState<string>(searchParams.get("search_string") || "" );
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

    const {
        data: allRobotsData,
        refetch,
        isLoading
    } = useQuery({
        queryKey: [
            "all-robotsData",
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

    const data = allRobotsData?.data;
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
           
            <div className="flex items-center justify-end bg-gray-100 rounded h-10 w-full space-x-2 mb-2">
                <select className="border border-gray-300 text-xs tracking-tight rounded h-6 w-36 focus:outline-none">
                    <option value="">All RoboT Types</option>
                    <option value="active">DEMETER_MINI</option>
                    <option value="pending">DEMETER_MAXI</option>
                    <option value="completed">Seeder-XR5</option>
                    <option value="completed">HarvBot-Mega</option>
                </select>

                <div className="flex relative h-6 items-center border border-gray-300 rounded">
                    <span
                        className="h-70% w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center"
                    >
                        <Search size={14}/>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-xs font-small tracking-tight rounded  h-6 w-35 focus:outline-none"
                        value={searchString}
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                    />

                </div>
                <div className=" flex w-25 justify-center -ml-2.5 ">

                    <button
                        type="button"
                        className=" flex justify-center items-center rounded bg-[#0ed78d] text-white text-sm  font-medium hover:bg-[#0cc87f] h-6 w-20"
                        onClick={() =>
                            navigate({
                                to: "/add-robot",
                            })
                        }
                    >
                        <span className="text-xs font-small tracking-tight">+ New Robot</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 mb-2 mx-2">
                <AllRobotsCards robots={allRobotsData?.data.records} searchString={searchString} searchParams={searchParams}  />
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
