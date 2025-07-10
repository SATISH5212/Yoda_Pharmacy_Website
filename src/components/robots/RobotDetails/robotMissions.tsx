import { Progress } from "@/components/ui/progress"
import { Outlet } from "@tanstack/react-router"

const RobotMissionsPage = () => {
    return (
        <div className='flex '>
            <div className='flex flex-col w-[25vw] space-y-4'>
                <div className="flex justify-between items-center">
                    <span className="space-x-2 items-center">
                        <span className="text-[#333333] font-normal text-lg">Missions</span>
                        <span className="bg-[#848484] text-xs text-white font-normal rounded-lg p-0.5 px-2">12</span>
                    </span>

                    <span>

                        <span><img src="/src/components/svg/robots/robotMissions/missionSearch.svg" alt="robot" className="w-[25px] h-[25px]" /></span>
                    </span>
                </div>
                <div className="flex-col flex-grow space-y-4">
                    <div className=" flex-grow  px-2 py-1 space-y-1 border-1 bordor-grey-200 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="flex-grow font-sans text-md text-black">Corn Harvest - Field A</span>
                            <span className=" flex flex-row gap-3">
                                <img src="/src/components/svg/robots/robotMissions/alert.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/notification.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotNetwork.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/battery.svg" alt="robot" className="w-[15px] h-[15px]" />
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className=" flex items-center gap-2">
                                <span className="text-[#828282] mb-0.5 text-sm">Area</span>
                                <span className="bg-[#F2F2F2] text-xs text-[#333333] font-medium rounded-sm p-0.5">12.5 hectars</span>
                            </span>
                            <span className="text-xs space-y-0.5">
                                <div className="text-sm text-[#828282]">Last Mission</div>
                                <div className="flex justify-end">Active</div>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex w-[65%] items-center gap-3 pl-1"><Progress className="h-2.25 [&>div]:rounded-full [&>div]:bg-sky-500" value={91} />60%</div>
                            <div className="text-[#4F4F4F] text-sm">Row: 12/24</div>
                        </div>
                    </div>
                    <div className=" flex-grow  px-2 py-1 space-y-1 border-1 bordor-grey-200 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="flex-grow font-sans text-md text-black">Corn Harvest - Field A</span>
                            <span className=" flex flex-row gap-3">
                                <img src="/src/components/svg/robots/robotMissions/alert.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/notification.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotNetwork.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/battery.svg" alt="robot" className="w-[15px] h-[15px]" />
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className=" flex items-center gap-2">
                                <span className="text-[#828282] mb-0.5 text-sm">Area</span>
                                <span className="bg-[#F2F2F2] text-xs text-[#333333] font-medium rounded-sm p-0.5">12.5 hectars</span>
                            </span>
                            <span className="text-xs space-y-0.5">
                                <div className="text-sm text-[#828282]">Last Mission</div>
                                <div className="flex justify-end">Active</div>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex w-[65%] items-center gap-3 pl-1"><Progress className="h-2.25 [&>div]:rounded-full [&>div]:bg-sky-500" value={91} />60%</div>
                            <div className="text-[#4F4F4F] text-sm">Row: 12/24</div>
                        </div>
                    </div>
                    <div className=" flex-grow  px-2 py-1 space-y-1 border-1 bordor-grey-200 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="flex-grow font-sans text-md text-black">Corn Harvest - Field A</span>
                            <span className=" flex flex-row gap-3">
                                <img src="/src/components/svg/robots/robotMissions/alert.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/notification.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotNetwork.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/battery.svg" alt="robot" className="w-[15px] h-[15px]" />
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className=" flex items-center gap-2">
                                <span className="text-[#828282] mb-0.5 text-sm">Area</span>
                                <span className="bg-[#F2F2F2] text-xs text-[#333333] font-medium rounded-sm p-0.5">12.5 hectars</span>
                            </span>
                            <span className="text-xs space-y-0.5">
                                <div className="text-sm text-[#828282]">Last Mission</div>
                                <div className="flex justify-end">Active</div>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex w-[65%] items-center gap-3 pl-1"><Progress className="h-2.25 [&>div]:rounded-full [&>div]:bg-sky-500" value={91} />60%</div>
                            <div className="text-[#4F4F4F] text-sm">Row: 12/24</div>
                        </div>
                    </div>
                    <div className=" flex-grow  px-2 py-1 space-y-1 border-1 bordor-grey-200 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="flex-grow font-sans text-md text-black">Corn Harvest - Field A</span>
                            <span className=" flex flex-row gap-3">
                                <img src="/src/components/svg/robots/robotMissions/alert.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/notification.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotNetwork.svg" alt="robot" className="w-[15px] h-[15px]" />
                                <img src="/src/components/svg/robots/robotMissions/battery.svg" alt="robot" className="w-[15px] h-[15px]" />
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className=" flex items-center gap-2">
                                <span className="text-[#828282] mb-0.5 text-sm">Area</span>
                                <span className="bg-[#F2F2F2] text-xs text-[#333333] font-medium rounded-sm p-0.5">12.5 hectars</span>
                            </span>
                            <span className="text-xs space-y-0.5">
                                <div className="text-sm text-[#828282]">Last Mission</div>
                                <div className="flex justify-end">Active</div>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex w-[65%] items-center gap-3 pl-1"><Progress className="h-2.25 [&>div]:rounded-full [&>div]:bg-sky-500" value={91} />60%</div>
                            <div className="text-[#4F4F4F] text-sm">Row: 12/24</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'><Outlet /></div>
        </div>
    )
}
export default RobotMissionsPage