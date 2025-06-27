import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from "@/config/appConfig";
import AddRobot from '../add-robot';
import RobotGrid from './robots-grid';
import Pagination from './pagination';
import { RobotConfig } from '@/types/dataTypes';

async function getRobotsData(page: number, page_size: number) {
  const response = await fetch(`${BASE_URL}/robots?page=${page}&page_size=${page_size}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  });
  const data = await response.json();
  return data.data;
}

export default function AllRobots() {
  const [showAddRobot, setShowAddRobot] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['robots', { page, pageSize }],
    queryFn: () => getRobotsData(page, pageSize),
  });

  if (isLoading) return <p>Loading robots...</p>;
  if (isError || !data) return <p>Error fetching robots</p>;

  const totalPages = Math.ceil(data.pagination_info.total_records / pageSize);

  return showAddRobot ? (
    <AddRobot onBack={() => setShowAddRobot(false)} />
  ) : (
    <>
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

      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={size => {
          setPageSize(size);
          setPage(1); // reset to first page
        }}
        totalPages={totalPages}
      />
    </>
  );
}
