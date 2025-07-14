
// import { iFieldQueryParams } from '@/lib/interfaces/maps';
// import { getAllRobotsAPI } from '@/lib/services/robots';
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate, useRouter } from '@tanstack/react-router';
// import { useEffect, useState } from 'react';
// import Pagination from '../core/Pagination';
// import AllRobotsCards from './AllRobotsCards';
// import { Search } from 'lucide-react';
// import RobotCardSkeleton from './robotCardSkelton';

// const AllRobotsPage = () => {
//     const navigate = useNavigate();
//     const router = useRouter();
//     const searchParams = new URLSearchParams(location.search);
//     const [robotType, setRobotType] = useState<string>(searchParams.get("search_string") || "");
//     const [searchString, setSearchString] = useState<string>(searchParams.get("search_string") || "");
//     const [debounceSearchString, setDebounceSearchString] = useState<string>(searchParams.get("search_string") || "");

//     const [pagination, setPagination] = useState<{
//         page: number;
//         page_size: number;
//         order_by: string | null;
//         order_type: string | null;
//     }>({
//         page: Number(searchParams.get("page")) || 1,
//         page_size: Number(searchParams.get("page_size")) || 10,
//         order_by: searchParams.get("order_by") || null,
//         order_type: searchParams.get("order_type") || null,
//     });
//     useEffect(() => {
//         if (robotType) {
//             return setDebounceSearchString(robotType)
//         }
//         const timer = setTimeout(() => {
//             setDebounceSearchString(searchString);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [searchString, robotType]);

//     useEffect(() => {
//         const currentSearchParams = new URLSearchParams(location.search);
//         setPagination({
//             page: Number(currentSearchParams.get("page")) || 1,
//             page_size: Number(currentSearchParams.get("page_size")) || 10,
//             order_by: currentSearchParams.get("order_by") || null,
//             order_type: currentSearchParams.get("order_type") || null,
//         });
//     }, [location.search]);

//     const {
//         data: allRobotsData,
//         refetch,
//         isLoading
//     } = useQuery({
//         queryKey: [
//             "all-robotsData",
//             pagination.page,
//             pagination.page_size,
//             pagination.order_by,
//             pagination.order_type,
//             debounceSearchString
//         ],
//         queryFn: async () => {
//             let queryParams: iFieldQueryParams = {
//                 page: pagination.page,
//                 page_size: pagination.page_size,
//                 order_by: pagination.order_by || undefined,
//                 order_type: pagination.order_type || undefined,
//                 search_string: debounceSearchString || undefined,
//             };
//             const routerParams = {
//                 ...queryParams,
//             };

//             router.navigate({
//                 to: "/all-robots",
//                 search: routerParams,
//                 replace: true,
//             });

//             const response = await getAllRobotsAPI(routerParams);
//             if (response?.status === 200 || response?.status === 201) {
//                 return response.data;
//             }
//             throw new Error("Failed to fetch robots");
//         },
//         refetchOnWindowFocus: false,
//         staleTime: 0,
//         enabled: true,
//     });

//     const getData = (params: any) => {
//         const newPagination = {
//             page: params.page || 1,
//             page_size: params.page_size || 10,
//             order_by: params.order_by || null,
//             order_type: params.order_type || null,
//         };

//         setPagination(newPagination);

//         const newSearchParams = new URLSearchParams();
//         Object.entries(params).forEach(([key, value]) => {
//             if (value !== undefined && value !== null && value !== '') {
//                 newSearchParams.set(key, String(value));
//             }
//         });

//         router.navigate({
//             to: "/robots",
//             search: Object.fromEntries(newSearchParams.entries()),
//             replace: true,
//         });
//     };


//     const data = allRobotsData?.data;
//     // if (!data) return <p className="text-center">No data available</p>;

//     const paginationDetails = data?.pagination_info;

//     const capturePageNum = (value: number) => {
//         getData({
//             page: value,
//             page_size: pagination.page_size,
//             order_by: pagination.order_by,
//             order_type: pagination.order_type,
//             search_string: debounceSearchString,
//         });
//     };

//     const captureRowPerItems = (value: number) => {
//         getData({
//             page: 1,
//             page_size: value,
//             order_by: pagination.order_by,
//             order_type: pagination.order_type,
//             search_string: debounceSearchString,
//         });
//     };

//     return (
//         <div className=" overflow-hidden h-[92vh]">
//             <div className="flex items-center  justify-between bg-gray-100  border-b h-12 w-full space-x-2 mb-2 pr-4">
//                 <div className='flex justify-start gap-x-2 ml-4'>
//                     <span className='text-md font-semibold'>10</span><span className='text-gray-500 mr-5'>Total Robots </span>
//                     <span className='text-md font-semibold'>8/10</span><span className='text-gray-500 mr-5'> Active Devices </span>
//                     <span className='text-md font-semibold'>89%</span><span className='text-gray-500 mr-5'>Average Performance </span>
//                 </div>
//                 <div className='flex justify-end gap-x-4 items-center'>
//                     <select className="border border-gray-300 text-sm tracking-tight rounded h-8 w-44 pl-1 hover:border-gray-400 hover:cursor-pointer focus:outline-none " onChange={(e) => setRobotType(e.target.value)}>
//                         <option value="">All Robots</option>
//                         <option value="demeter minix">DEMETER MINIX</option>
//                         <option value="demeter maxi">DEMETER MAXI</option>
//                     </select>

//                     <div className="flex relative h-8 w-50  items-center border border-gray-300 rounded hover:border-gray-400">
//                         <span
//                             className="h-70% w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center"
//                         >
//                             <Search size={14} />
//                         </span>
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             value={searchString}
//                             className="text-sm font-small tracking-tight rounded  h-6 w-35 focus:outline-none"
//                             onChange={(e) => {
//                                 setSearchString(e.target.value);
//                             }}
//                         />

//                     </div>
//                     <div className=" flex justify-center  h-8 w-30">
//                         <button
//                             type="button"
//                             className=" flex justify-center items-center rounded bg-[#0ed78d] text-white font-medium hover:bg-[#0cc87f] cursor-pointer h-full w-full"
//                             onClick={() =>
//                                 navigate({
//                                     to: "/add-robot",
//                                 })
//                             }
//                         >
//                             <span className="text-md font-semibold tracking-tight">+ New Robot</span>
//                         </button>
//                     </div>
//                 </div>

//             </div>
//             {
//                 isLoading ? (
//                     <div className="flex flex-wrap gap-4">
//                         {[...Array(8)].map((_, index) => (
//                             <RobotCardSkeleton key={index} />
//                         ))}
//                     </div>
//                 ) : (
//                     <AllRobotsCards robots={allRobotsData?.data.records} searchString={searchString} />
//                 );

//             return (
//             <div className="flex-1 grow overflow-y-auto mb-2 px-5 h-full">
//                 {robotCards}
//             </div>
//             );  
//         }

//             <div className="border-t border-gray-200 bg-white sticky bottom-0 z-10">
//                 <Pagination
//                     paginationDetails={paginationDetails}
//                     capturePageNum={capturePageNum}
//                     captureRowPerItems={captureRowPerItems}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AllRobotsPage;



import { iFieldQueryParams } from '@/lib/interfaces/maps';
import { getAllRobotsAPI } from '@/lib/services/robots';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Pagination from '../core/Pagination';
import AllRobotsCards from './AllRobotsCards';
import { Search } from 'lucide-react';
import RobotCardSkeleton from './robotCardSkelton';

const AllRobotsPage = () => {
    const navigate = useNavigate();
    const router = useRouter();
    const searchParams = new URLSearchParams(location.search);
    const [robotType, setRobotType] = useState<string>(searchParams.get("search_string") || "");
    const [searchString, setSearchString] = useState<string>(searchParams.get("search_string") || "");
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
        if (robotType) {
            return setDebounceSearchString(robotType)
        }
        const timer = setTimeout(() => {
            setDebounceSearchString(searchString);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchString, robotType]);

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
            to: "/all-robots", // Fixed: changed from "/robots" to "/all-robots"
            search: Object.fromEntries(newSearchParams.entries()),
            replace: true,
        });
    };

    const data = allRobotsData?.data;
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

    // Create the robot cards content
    const robotCards = isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, index) => (
                <RobotCardSkeleton key={index} />
            ))}
        </div>
    ) : (
        <AllRobotsCards robots={allRobotsData?.data.records} searchString={searchString || robotType} />
    );

    return (
        <div className="overflow-hidden h-[92vh]">
            <div className="flex items-center justify-between bg-gray-100 border-b h-12 w-full space-x-2 mb-2 pr-4">
                <div className='flex justify-start gap-x-2 ml-4'>
                    <span className='text-md font-semibold'>10</span><span className='text-gray-500 mr-5'>Total Robots </span>
                    <span className='text-md font-semibold'>8/10</span><span className='text-gray-500 mr-5'> Active Devices </span>
                    <span className='text-md font-semibold'>89%</span><span className='text-gray-500 mr-5'>Average Performance </span>
                </div>
                <div className='flex justify-end gap-x-4 items-center'>
                    <select className="border border-gray-300 text-sm tracking-tight rounded h-8 w-44 pl-1 hover:border-gray-400 hover:cursor-pointer focus:outline-none "
                        onChange={(e) => {
                            setRobotType(e.target.value)
                            setSearchString("");
                        }}>
                        <option value="">All Robots</option>
                        <option value="DEMETER_MINIX">DEMETER MINIX</option>
                        <option value="DEMETER_MAXI">DEMETER MAXI</option>
                    </select>

                    <div className="flex relative h-8 w-50 items-center border border-gray-300 rounded hover:border-gray-400">
                        <span className="h-70% w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center">
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchString}
                            className="text-sm font-small tracking-tight rounded h-6 w-35 focus:outline-none"
                            onChange={(e) => {
                                setSearchString(e.target.value);
                                setRobotType("");
                            }}
                        />
                    </div>
                    <div className="flex justify-center h-8 w-30">
                        <button
                            type="button"
                            className="flex justify-center items-center rounded bg-[#0ed78d] text-white font-medium hover:bg-[#0cc87f] cursor-pointer h-full w-full"
                            onClick={() =>
                                navigate({
                                    to: "/add-robot",
                                })
                            }
                        >
                            <span className="text-md font-semibold tracking-tight">+ New Robot</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 grow overflow-y-auto mb-2 px-5 h-full">
                {robotCards}
            </div>

            <div className="border-t border-gray-200 bg-white sticky bottom-0 z-10">
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