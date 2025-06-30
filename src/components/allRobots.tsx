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
    const { data, isLoading, isError} = useQuery({
        queryKey: ['robots', { page, page_size }],
        queryFn: () => getRobotsData(page, page_size),
    });

    const total = []
    if (data) {
        for (let i = 1; i <= Math.ceil((data?.pagination_info.total_records) / (page_size)); i++) {
            total.push(i);
        }
    }

    if (isLoading) return <p>Loading robots...</p>;
    if (isError) return <p>Error at Fetching Robots</p>;
    console.log(data)


    return showAddRobot ? (<AddRobot onBack={() => setShowAddRobot(false)} />) : (
        <>
            {/* head */}
            <div className='relative ml-1'>
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

                {/* cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
                    {data?.records.map((robot: RobotConfig) => (
                        // <div key={robot.id} className="p-4 border rounded-xl">
                        //     <ul className="list-none text-sm space-y-3">
                        //         <li>
                        //             <span className="font-bold">{robot.robot_name}</span>
                        //         </li>
                        //         <li className="flex justify-between">
                        //             <span className="font-semibold text-[10px]">IP Address</span>
                        //             <span className='text-xs'>{robot.ip_address}</span>
                        //         </li>
                        //         <li className="flex justify-between">
                        //             <span className="font-semibold"><MapPin size={12} />

                        //             </span>

                        //             <span className='text-xs'>Hyderabad</span>
                        //         </li>
                        //         <li className="flex justify-between">
                        //             <span className="font-semibold"><BatteryFull size={12} /></span>
                        //             <span className='text-xs'>75%</span>
                        //         </li>
                        //     </ul>

                        // </div>
                        <div
                            key={robot.id}
                            className="relative bg-white border shadow-xl rounded-2xl p-4 w-full max-w-xs backdrop-blur-sm transition-transform hover:scale-[1.02]"
                        > 
                            {/* Robot Name */}
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-green-800">
                                    🤖 {robot.robot_name}
                                </h3>

                            </div>

                            {/* Info List */}
                            <ul className="text-sm space-y-3 text-gray-700">
                                {/* IP Address */}
                                <li className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-medium">IP Address</span>
                                    <span className="text-sm font-mono">{robot.ip_address}</span>
                                </li>

                                {/* Location */}
                                <li className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 font-medium text-gray-600">
                                        <MapPin size={14} className="text-emerald-600" />
                                        <span className="text-xs">Location</span>
                                    </span>
                                    <span className="text-sm">{"Hyderabad"}</span>
                                </li>

                                {/* Battery */}
                                <li className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 font-medium text-gray-600">
                                        <BatteryFull size={14} className="text-lime-600" />
                                        <span className="text-xs">Battery</span>
                                    </span>
                                    <div className="text-sm font-semibold text-lime-700 flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                                        75%
                                    </div>
                                </li>
                            </ul>

                        </div>

                    ))}
                </div>

                {/* pagination */}
                <div className="w-full fixed bottom-0 left-0 right-0 rounded shadow-2xl border bg-white border-gray-300 ">
                    {/* <div className="w-[1208px] fixed bottom-0 rounded shadow-2xl border bg-white border-gray-300"> */}
                    <div className="flex items-center justify-between p-0.5  text-xs ">
                        <div>
                            <span>Result per page </span>
                            <select className='border rounded p-0.5'
                                value={page_size}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value))
                                    setPage(1)
                                }}
                            >
                                <option value="5">5 pages</option>
                                <option value="10">10 pages</option>
                                <option value="15">15 pages</option>
                            </select>
                        </div>
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
                                className='px-4 py-1 mr-1 text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200'
                            >Next
                            </button>

                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}