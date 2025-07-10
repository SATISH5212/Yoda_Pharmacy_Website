import { Progress } from "@/components/ui/progress"
import { Outlet } from "@tanstack/react-router"

const RobotDetals = () => {
    return (
        <div className='flex flex-row h-[93vh] m-2'>
            <div className='flex flex-col w-[24%] m-2 space-y-4'>
                <div className="flex  h-[10%] w-[80%] space-x-2" >
                    <div className="flex w-[30%] "><img src="/src/components/svg/robots/robot.svg" alt="robot" /></div>
                    <div className="flex-grow  px-2 py-1 space-y-2 mt-2">
                        <div className="flex justify-between">
                            <span className="flex justify-between space-x-2 ">
                                <span className="font-medium text-md text-black-200">Spray Guardian</span>
                                <span className="bg-green-500 rounded-full w-3 h-3 mt-2"></span>
                            </span>
                            <span className="">
                                <span className="bg-black rounded-md w-full h-2 my-1 text-white px-3 text-sm">Active</span>
                            </span>
                        </div>
                        <div className="text-sm font-normal">ID: DMTR:524154 </div>
                    </div>
                </div>
                <div className="flex flex-col h-[74%] w-[95%] space-y-6">
                    <div className="flex-grow border-1 bordor-grey-200 rounded-sm space-y-3 px-3 py-3">
                        <div className="flex flex-row gap-2 text-[#4F4F4F] tracking-wide"><img src="/src/components/svg/robots/efficiency.svg" alt="efficiency" />Performance Overview</div>
                        <div className="flex-grow  space-y-1 ">
                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between text-sm ">
                                    <div className=" flex flex-row gap-2 tracking-tight">
                                        <img src="/src/components/svg/robots/battery.svg" alt="efficiency" />
                                        Battery Level
                                    </div>
                                    <div className="text-[#22A56F]">67%</div>
                                </div>
                                <div><Progress className="h-2.25 [&>div]:bg-sky-500 [&>div]:rounded-full" value={50} /></div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between text-sm tracking-tight">
                                    <div className=" flex flex-row gap-2 ">
                                        <img src="/src/components/svg/robots/robotNetwork.svg" alt="efficiency" className="flex mt-1 w-[15px] h-[15px] items-end" />
                                        Connectivity
                                    </div>
                                    <div className="">Good</div>
                                </div>
                                <div><Progress className="h-2.25 [&>div]:bg-gradient-to-r [&>div]:from-[#FF0000] [&>div]:via-[#FF8800] [&>div]:to-[#008323] [&>div]:rounded-full" value={80} /></div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex justify-between text-sm ">
                                    <div className=" flex flex-row gap-2 tracking-tight">
                                        <img src="/src/components/svg/robots/efficiency.svg" alt="efficiency" />
                                        Efficiency
                                    </div>
                                    <div className="text-[#22A56F]">91%</div>
                                </div>
                                <div><Progress className="h-2.25 [&>div]:rounded-full" value={91} /></div>
                            </div>
                            <div className="border-b-1 border-grey-200 mt-6"></div>
                        </div>
                        <div className="flex-col space-y-2">
                            <div className="flex h-fill space-x-2">
                                <span className="flex pt-1">
                                    <img src="/src/components/svg/robots/robotsDetails/robotIocation.svg" alt="efficiency" className="w-[16px] h-[16px]" />
                                </span>
                                <span className="flex-grow pt-0.5">
                                    <div className="text-md font-medium text-black tracking-wider ">
                                        Current Location
                                    </div>
                                    <div className="text-sm text-gray-400">Field C-3</div>
                                </span>
                            </div>
                            <div className="flex h-fill space-x-2">
                                <span className="flex pt-1">
                                    <img src="/src/components/svg/robots/robotTimer.svg" alt="efficiency" className="w-[16px] h-[16px]" />
                                </span>
                                <span className="flex-grow pt-0.5">
                                    <div className="text-md font-medium text-black tracking-wider">
                                        Last Active
                                    </div>
                                    <div className="text-sm text-gray-400 ">11-06-2025, 03:15:00 PM</div>
                                </span>
                            </div>
                            <div className="flex h-fill space-x-2">
                                <span className="flex pt-1">
                                    <img src="/src/components/svg/robots/robotTimer.svg" alt="efficiency" className="w-[16px] h-[16px]" />
                                </span>
                                <span className="flex-grow pt-0.5">
                                    <div className="text-md font-medium text-black tracking-wider">
                                        UUID
                                    </div>
                                    <div className="text-sm text-gray-400 ">11-06-2025, 03:15:00 PM</div>
                                </span>
                            </div>
                            <div className="flex h-fill space-x-2">
                                <span className="flex pt-1">
                                    <img src="/src/components/svg/robots/robotTimer.svg" alt="efficiency" className="w-[16px] h-[16px]" />
                                </span>
                                <span className="flex-grow pt-0.5">
                                    <div className="text-md font-medium text-black tracking-wider">
                                        Model
                                    </div>
                                    <div className="text-sm text-gray-400 ">11-06-2025, 03:15:00 PM</div>
                                </span>
                            </div><div className="flex h-fill space-x-2">
                                <span className="flex pt-1">
                                    <img src="/src/components/svg/robots/robotTimer.svg" alt="efficiency" className="w-[16px] h-[16px]" />
                                </span>
                                <span className="flex-grow pt-0.5">
                                    <div className="text-md font-medium text-black tracking-wider">
                                        Current Status
                                    </div>
                                    <div className="text-sm text-gray-400 ">11-06-2025, 03:15:00 PM</div>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className=" border-1 bordor-grey-200 rounded-sm space-y-3 px-3 py-2">
                        <span className="flex font-medium space-x-2"><img src="/src/components/svg/robots/robotsDetails/calander.svg" alt="calander" /><span>Timeline</span></span>
                        <div>
                            <div>Last mission</div>
                            <div className="flex text-sm text-gray-400">April 15, 2025</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'><Outlet /></div>
        </div>
    )
}

export default RobotDetals