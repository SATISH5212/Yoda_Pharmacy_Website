import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from "@/config/appConfig"
import { RobotConfig } from "@/types/dataTypes"
import { BatteryFull, MapPin } from 'lucide-react';
import AddRobot from './add-robot';
import { useState } from 'react';


async function getRobotsData(page: number, page_size: number) {
    const response = await fetch(`${BASE_URL}/robots?page=${page}&page_size=${page_size}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    const data = await response.json();
    console.log(data);
    return data.data;
}

export default function AllRobots() {

    
    const [showAddRobot, setShowAddRobot] = useState(false);
    const [page, setPage] = useState(1);
    const [page_size, setPageSize] = useState(5)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['robots', { page, page_size }],
        queryFn: () => getRobotsData(page, page_size),
    });

    const total = []
    if (data) {
        for (let i = 1; i <= (data?.pagination_info.total_records) / (page_size); i++) {
            total.push(i);
        }
    }

    if (isLoading) return <p>Loading robots...</p>;
    if (isError) return <p>Error at Fetching Robots</p>;
    console.log(data)


    return showAddRobot ? (<AddRobot onBack={() => setShowAddRobot(false)} />) : (
        <>
            <div className='bg-gray-200 rounded p-1 mb-2 w-full'>
                <span className='text-gray-400 text-xs font-serif'>Total Robots : </span>
                <span className='text-xs' >{data.pagination_info.total_records} </span>
                <button type="button" className='rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right'
                    onClick={() =>
                        setShowAddRobot(true)
                    }
                > + New Robot
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.records.map((robot: RobotConfig) => (
                    <div key={robot.id} className="p-4 border rounded-xl">
                        <ul className="list-none text-sm space-y-3">
                            <li>
                                <span className="font-bold">{robot.robot_name}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold text-[10px]">IP Address</span>
                                <span className='text-xs'>{robot.ip_address}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold"><MapPin size={12} />

                                </span>

                                <span className='text-xs'>Hyderabad</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-semibold"><BatteryFull size={12} /></span>
                                <span className='text-xs'>75%</span>
                            </li>
                        </ul>

                    </div>
                ))}
            </div>

            {/* pagination */}
            <div className="w-full fixed bottom-0 rounded bg-gray-100 border-t border-gray-300">
                <div className="flex items-center justify-center gap-2 p-0.5  text-xs ">
                    {/* <span className='text-sm'>page {data.pagination_info.current_page} of {data.pagination_info.total_pages}</span> */}

                    <span>Result per page</span>
                    <select className='border rounded p-0.5'
                        value={page_size}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value)) 
                        }}
                    >
                        <option value="5">5 pages</option>
                        <option value="10">10 pages</option>
                        <option value="15">15 pages</option>
                    </select>
                    <span>
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className='px-2 py-1  text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200'
                        >Previous
                        </button>
                        {
                            total.map((pageNumber) => (
                                <button className={`text-xs px-2 m-0.5 py-1 border rounded-2xl cursor-pointer ${page === pageNumber
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-300"
                                    }`}
                                    onClick={() => {
                                        setPage(pageNumber)
                                    }}
                                >
                                    {pageNumber}
                                </button>
                            ))
                        }
                        <button
                            disabled={page === data.pagination_info.total_pages}
                            onClick={() => setPage(prev => prev + 1)}
                            className='px-4 py-1 text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200'
                        >Next
                        </button>

                    </span>
                </div>
            </div>
        </>
    )
}