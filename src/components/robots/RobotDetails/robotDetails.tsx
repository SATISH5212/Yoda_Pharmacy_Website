import { Progress } from "@/components/ui/progress"
import { Outlet } from "@tanstack/react-router"

const RobotDetals = () => {
    return (
        <div className="flex flex-col lg:flex-row h-[93vh] m-2">
            <div className="hidden lg:flex lg:flex-col lg:w-[24%] m-2 space-y-4 overflow-y-auto">
                <div className="flex h-[10%] w-[80%] space-x-2">
                    <div className="w-[30%]">
                        <img src="/public/assets/robots/robot.svg" alt="robot" />
                    </div>
                    <div className="flex-grow px-2 py-1 space-y-2 mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-2">
                                <span className="font-medium text-md text-black">Spray Guardian</span>
                                <span className="bg-green-500 rounded-full w-3 h-3 mt-2"></span>
                            </div>
                            <span className="bg-black rounded-md h-5 text-white px-3 text-sm">Active</span>
                        </div>
                        <div className="text-sm font-normal">ID: DMTR:524154</div>
                    </div>
                </div>
                <div className="flex flex-col h-[74%] w-[95%] space-y-6">
                    <div className="flex-grow border border-gray-200 rounded-sm space-y-3 px-3 py-3">
                        <div className="flex gap-2 text-[#4F4F4F] tracking-wide">
                            <img src="/public/assets/robots/efficiency.svg" alt="efficiency" />
                            Performance Overview
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <div className="flex gap-2">
                                    <img src="/public/assets/robots/battery.svg" alt="battery" />
                                    Battery Level
                                </div>
                                <div className="text-[#22A56F]">67%</div>
                            </div>
                            <Progress className="h-2 [&>div]:bg-sky-500 [&>div]:rounded-full" value={50} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <div className="flex gap-2">
                                    <img src="/public/assets/robots/robotNetwork.svg" alt="network" className="w-[15px] h-[15px]" />
                                    Connectivity
                                </div>
                                <div>Good</div>
                            </div>
                            <Progress className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#FF0000] [&>div]:via-[#FF8800] [&>div]:to-[#008323] [&>div]:rounded-full" value={80} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <div className="flex gap-2">
                                    <img src="/public/assets/robots/efficiency.svg" alt="efficiency" />
                                    Efficiency
                                </div>
                                <div className="text-[#22A56F]">91%</div>
                            </div>
                            <Progress className="h-2 [&>div]:rounded-full" value={91} />
                        </div>

                        <div className="mt-6 border-b border-gray-200"></div>

                        <div className="space-y-3 pt-2">
                            {[
                                { label: "Current Location", value: "Field C-3", icon: "robotsDetails/robotIocation" },
                                { label: "Last Active", value: "11-06-2025, 03:15:00 PM", icon: "robotTimer" },
                                { label: "UUID", value: "11-06-2025, 12:19:00 PM", icon: "robotTimer" },
                                { label: "Model", value: "11-06-2025, 10:40:40 PM", icon: "robotTimer" },
                                { label: "Current Status", value: "11-06-2025, 11:34:00 AM", icon: "robotTimer" },
                            ].map((item, idx) => (
                                <div className="flex space-x-2" key={idx}>
                                    <img src={`/public/assets/robots/${item.icon}.svg`} alt={item.label} className="w-[16px] h-[16px]" />
                                    <div>
                                        <div className="text-md font-medium text-black tracking-wider">{item.label}</div>
                                        <div className="text-sm text-gray-400">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-sm space-y-3 px-3 py-2">
                        <div className="flex font-medium space-x-2">
                            <img src="/public/assets/robots/robotsDetails/calander.svg" alt="calendar" />
                            <span>Timeline</span>
                        </div>
                        <div>
                            <div>Last mission</div>
                            <div className="text-sm text-gray-400">April 15, 2025</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow">
                <Outlet />
            </div>
        </div>
    );

}

export default RobotDetals