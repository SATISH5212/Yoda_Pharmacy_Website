import { Progress } from "@/components/ui/progress"
import { Outlet } from "@tanstack/react-router"

const RobotMissionsPage = () => {
    return (

        <div className='flex flex-col lg:flex-row w-full'>
            <div className='hidden lg:flex lg:flex-col lg:w-[25vw] space-y-4 pr-2 border-r border-gray-200 overflow-y-auto'>
                <div className="flex justify-between items-center px-2 pt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-[#333333] font-normal text-lg">Missions</span>
                        <span className="bg-[#848484] text-xs text-white font-normal rounded-lg px-2 py-0.5">12</span>
                    </div>
                    <img src="/public/assets/robots/robotMissions/missionSearch.svg" alt="search" className="w-[25px] h-[25px]" />
                </div>
                <div className="flex flex-col space-y-4 px-2 pb-4 overflow-y-auto">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="px-2 py-1 space-y-2 border border-gray-200 rounded-md bg-white">
                            <div className="flex justify-between items-center">
                                <span className="font-sans text-md text-black flex-grow">Corn Harvest - Field A</span>
                                <span className="flex gap-2">
                                    <img src="/public/assets/robots/robotMissions/alert.svg" alt="alert" className="w-[15px] h-[15px]" />
                                    <img src="/public/assets/robots/robotMissions/notification.svg" alt="notif" className="w-[15px] h-[15px]" />
                                    <img src="/public/assets/robots/robotNetwork.svg" alt="network" className="w-[15px] h-[15px]" />
                                    <img src="/public/assets/robots/robotMissions/battery.svg" alt="battery" className="w-[15px] h-[15px]" />
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2 text-[#828282]">
                                    <span>Area</span>
                                    <span className="bg-[#F2F2F2] text-[#333333] font-medium rounded-sm px-1 py-0.5 text-xs">12.5 hectars</span>
                                </div>
                                <div className="text-xs text-right space-y-0.5">
                                    <div className="text-[#828282]">Last Mission</div>
                                    <div className="text-[#333]">Active</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 w-[65%] pl-1">
                                    <Progress className="h-2 [&>div]:rounded-full [&>div]:bg-sky-500" value={91} />
                                    <span className="text-sm">60%</span>
                                </div>
                                <div className="text-[#4F4F4F] text-sm">Row: 12/24</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-grow'>
                <Outlet />
            </div>
        </div>


    )
}
export default RobotMissionsPage