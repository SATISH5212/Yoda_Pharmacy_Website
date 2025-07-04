import { iFieldQueryParams } from '@/lib/interfaces/maps';
import { getAllRobotsAPI } from '@/lib/services/robots';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import RobotGrid from './robots-grid';
import Pagination from '../core/Pagination';


const AllRobotsPage = () => {
  const [showAddRobot, setShowAddRobot] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
    queryKey: ["all-fieldsData"],
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
        to: "/robots",
        search: routerParams,
        replace: true,
      });
      const response = await getAllRobotsAPI(routerParams);
      if (response?.status === 200 || response?.status === 201) {
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
      to: "/robots",
      search: Object.fromEntries(newSearchParams.entries()),
      replace: true,
    });
  };

  if (isLoading) return <p>Loading robots...</p>;
  // if (isError || !data) return <p>Error fetching robots</p>;
  const data = allFieldsData?.data
  const totalPages = Math.ceil(data.pagination_info.total_records / pageSize);
  const paginationDetails = data?.pagination_info

  const capturePageNum = (value: number) => {
    getData({
      ...searchParams,
      page_size: searchParams.get("page_size")
        ? +(searchParams.get("page_size") as string)
        : 25,
      page: value,
      order_by: searchParams.get("order_by"),
      order_type: searchParams.get("order_type"),
    });
  };

  const captureRowPerItems = (value: number) => {
    getData({
      ...searchParams,
      page_size: value,
      page: 1,
      order_by: searchParams.get("order_by"),
      order_type: searchParams.get("order_type"),
      search_string: searchParams.get("search_string"),
    });
  };
  return (
    <div>
      <div className='bg-gray-200 rounded p-1 mb-2 w-full'>
        <span className='text-gray-400 text-xs font-serif'>Total Robots: </span>
        <span className='text-xs'>{data.pagination_info.total_records}</span>
        <button
          className='rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] float-right text-white cursor-pointer'
          onClick={() => setShowAddRobot(true)}
        >
          + New Robot
        </button>
      </div>

      <RobotGrid robots={data.records} />


      <div className="border-t border-gray-200">
        <Pagination
          paginationDetails={paginationDetails}
          capturePageNum={capturePageNum}
          captureRowPerItems={captureRowPerItems}
        />
      </div>

    </div>
  )
}


export default AllRobotsPage
