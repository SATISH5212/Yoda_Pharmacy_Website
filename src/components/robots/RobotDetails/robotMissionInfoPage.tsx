import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";

const RobotMissionInfoPage = () => {
    const [activeTab, setActiveTab] = useState("mission-details");
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <div className="flex flex-col w-full h-full px-2 space-y-2">
            <div className="space-y-1">
                <div className="flex justify-between" >
                    <span className=" flex-col">
                        <div className="font-semibold text-md tracking-wide">Mission Name</div>
                        <div className=" text-sm">Harvesting</div>
                    </span>
                    <span className=" flex space-x-2 items-center">
                        <span className="flex text-xs justify-between  h-[23px] rounded-md border-1 py-1 px-2 border-black hover:bg-gray-100 hover:cursor-pointer items-center"><img src="/src/components/svg/robots/robotMissionInfo/downloadIcon.svg" alt="download" className="flex w-[13px] h-[13px] self-center mr-1 " />Download Report</span>
                        <span className="flex text-xs justify-between  h-[23px] rounded-md border-1 py-1 px-2 border-black hover:bg-gray-100 hover:cursor-pointer items-center"><img src="/src/components/svg/robots/robotMissionInfo/shareIcon.svg" alt="share" className="w-[13px] h-[13px]" />Share Results</span>
                        <span className="flex text-xs justify-between  h-[23px] rounded-md border-1 py-1 px-2 border-black hover:bg-gray-100 hover:cursor-pointer items-center"><img src="/src/components/svg/robots/robotMissions/alert.svg" alt="alerts" className="w-[13px] h-[13px]" />Alerts</span>
                    </span>
                </div>
                <div className="flex justify-between bg-[#F2F2F2] items-center p-1 py-2 rounded-sm">
                    <span className="bg-[#CCE4D0] text-xs text-[#00763C] rounded-md px-2 py-0.5">ID: DMTR-2023-1142</span>
                    <span className="flex items-center justify-between gap-4 font-medium">
                        <span className="flex items-center text-xs gap-1"><img src="/src/components/svg/robots/robotsDetails/calander.svg" alt="calander" className="w-[13px] h-[13px]" /> Completed: June 12,2025 - 15:15 PM</span>
                        <span className="flex items-center text-xs gap-1"><img src="/src/components/svg/robots/robotTimer.svg" alt="timer" className="w-[13px] h-[13px]" /> Total Duration: 8hr 45m</span>
                    </span>
                </div>


            </div>
            <div className="flex-row">
                <Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="mission-details">
                    <TabsList className="flex-shrink-0  rounded-md bg-[#D6D6D6] p-0 h-[23px] border-1 rounded-xs gap-3">

                        <TabsTrigger
                            value="mission-details"
                            className={`flex items-center gap-1 text-xs px-2  h-full 
                                ${activeTab === "mission-details" ? "bg-white border-gray-400 rounded-xs" : ""}`}
                        >
                            <img src="/src/components/svg/robots/robotMissionInfo/missionDetailsIcon.svg" alt="missionDetails" className="w-[15px] h-[15px]" />Mission Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="timeline"
                            className={`flex items-center gap-1 text-xs px-2  h-full 
                                ${activeTab === "timeline" ? "bg-white border-gray-400 rounded-xs" : ""}`}
                        >
                            <img src="/src/components/svg/robots/robotMissions/Alert.svg" alt="timeline" className="w-[15px] h-[15px]" /> Timeline
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className={`flex items-center gap-1 text-xs px-2  h-full  
                                ${activeTab === "analytics" ? "bg-white border-gray-400 rounded-xs" : ""}`}
                        >
                            <img src="/src/components/svg/robots/efficiency.svg" alt="analytics" className="w-[15px] h-[15px]" /> Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="alerts"
                            className={`flex items-center gap-1 text-xs px-2  h-full r 
                                ${activeTab === "alerts" ? "bg-white border-gray-400 rounded-xs" : ""}`}
                        >
                            <img src="/src/components/svg/robots/robotMissions/Alert.svg" alt="timeline" className="w-[15px] h-[15px]" />Alerts
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="mission-details" className="flex-grow p-2 rounded shadow-sm">
                        <div className="flex flex-col">
                            <div className="flex items-center   text-sm font-semibold  gap-2"><img src="/src/components/svg/robots/robotMissionInfo/assignedRobotsIcon.svg" alt="multi-users" className="w-[13px] h-[13px]" />Assigned Robots (2)</div>
                            <div className="flex justify-between p-2 gap-4 ">
                                <span className="flex justify-between items-center w-full border rounded-md pb-2 pt-1">
                                    <span className="flex items-start gap-1 px-2  ">
                                        <div className=" flex  w-2  h-2 bg-green-500 rounded-full mr-1 mt-1.5"></div>
                                        <div className="">
                                            <div className="text-sm text-black"> Harvest Bot Alpa</div>
                                            <div className="text-xs text-[#8E8E8E]">ID: MTDR:524154</div>
                                        </div>
                                    </span>
                                    <span><img src="/src/components/svg/robots/robotMissionInfo/exclamationIcon.svg" alt="robot" className="w-[15px] h-[15px] m-2 ite" /></span>
                                </span>
                                <span className="flex justify-between items-center w-full border rounded-md pb-2 pt-1">
                                    <span className="flex items-start gap-1 px-2  ">
                                        <div className=" flex  w-2  h-2 bg-green-500 rounded-full mr-1 mt-1.5"></div>
                                        <div className="">
                                            <div className="text-sm text-black"> Harvest Bot Alpa</div>
                                            <div className="text-xs text-[#8E8E8E]">ID: MTDR:524154</div>
                                        </div>
                                    </span>
                                    <span><img src="/src/components/svg/robots/robotMissionInfo/exclamationIcon.svg" alt="robot" className="w-[15px] h-[15px] m-2 ite" /></span>
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-between mb-2 h-15">
                            <span className="flex-col text-sm w-1/5 border-1 rounded-sm">
                                <div className="flex-col w-fill bg-[#EDEDED] rounded-t-sm  items-center h-[55%] space-x-1 pl-2  pt-1.5" >
                                    <span className="text-sm font-semibold">18L</span>
                                    <span className=" text-xs text-[#4F4F4F]">(EST 20L)</span>
                                </div>
                                <div className="flex flex-col items-center pt-1" >
                                    <div className="flex text-xs text-[#4F4F4F]     ">
                                        Fuel Used
                                    </div>
                                </div>

                            </span>
                            <span className="flex-col text-sm w-1/5 border-1 rounded-sm">
                                <div className="flex-col w-fill bg-[#EDEDED] rounded-t-sm  items-center h-[55%] space-x-1 pl-2  pt-1.5" >
                                    <span className="text-sm font-semibold">18L</span>
                                    <span className=" text-xs text-[#4F4F4F]">(EST 20L)</span>
                                </div>
                                <div className="flex flex-col items-center pt-1" >
                                    <div className="flex text-xs text-[#4F4F4F]     ">
                                        Fuel Used
                                    </div>
                                </div>

                            </span>
                            <span className="flex-col text-sm w-1/5 border-1 rounded-sm">
                                <div className="flex-col w-fill bg-[#EDEDED] rounded-t-sm  items-center h-[55%] space-x-1 pl-2  pt-1.5" >
                                    <span className="text-sm font-semibold">18L</span>
                                    <span className=" text-xs text-[#4F4F4F]">(EST 20L)</span>
                                </div>
                                <div className="flex flex-col items-center pt-1" >
                                    <div className="flex text-xs text-[#4F4F4F]     ">
                                        Fuel Used
                                    </div>
                                </div>

                            </span>
                            <span className="flex-col text-sm w-1/5 border-1 rounded-sm">
                                <div className="flex-col w-fill bg-[#EDEDED] rounded-t-sm  items-center h-[55%] space-x-1 pl-2  pt-1.5" >
                                    <span className="text-sm font-semibold">18L</span>
                                    <span className=" text-xs text-[#4F4F4F]">(EST 20L)</span>
                                </div>
                                <div className="flex flex-col items-center pt-1" >
                                    <div className="flex text-xs text-[#4F4F4F]     ">
                                        Fuel Used
                                    </div>
                                </div>

                            </span>
                            <span className="flex-col text-sm w-1/5 border-1 rounded-sm">
                                <div className="flex-col w-fill bg-[#EDEDED] rounded-t-sm  items-center h-[55%] space-x-1 pl-2  pt-1.5" >
                                    <span className="text-sm font-semibold">18L</span>
                                    <span className=" text-xs text-[#4F4F4F]">(EST 20L)</span>
                                </div>
                                <div className="flex flex-col items-center pt-1" >
                                    <div className="flex text-xs text-[#4F4F4F]     ">
                                        Fuel Used
                                    </div>
                                </div>

                            </span>
                        </div>
                        <div className="flex justify-between gap-4 h-[180px]  ">
                            <span className="flex border rounded-md p-2 w-1/2 items-center justify-center">live stream</span>
                            <span className="flex border rounded-md p-2 w-1/2 items-center justify-center" >Video</span>
                        </div>
                        <div className="mt-3 space-y-2">
                            <div className="font-semibold text-sm">Quality Performance</div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#717182]" >Crop Loss Rate</span>


                                <span className="flex items-center gap-4">
                                    1.3%
                                    <span className="flex  text-[#00763C] rounded-md items-center bg-[#CCFFD5] h-5 py-2 pr-2">
                                        <img src="/src/components/svg/robots/robotTimer.svg" alt="robot" className="w-[13px] h-[13px] mr-1 ml-3" /> Outstanding</span>

                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#717182]" >Contamination Level</span>


                                <span className="flex items-center gap-4">
                                    0.2%
                                    <span className="flex  text-[#00763C] rounded-md items-center bg-[#CCFFD5] h-5 py-2 pr-2">
                                        <img src="/src/components/svg/robots/robotTimer.svg" alt="robot" className="w-[13px] h-[13px] mr-1 ml-3" /> Minimal</span>

                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#717182]" >Harvest Quality Grade</span>


                                <span className="flex items-center gap-4">
                                    A+
                                    <span className="flex  text-[#00763C] rounded-md items-center bg-[#CCFFD5] h-5 py-2 pr-2">
                                        <img src="/src/components/svg/robots/robotTimer.svg" alt="robot" className="w-[13px] h-[13px] mr-1 ml-3" /> Premium Quality</span>

                                </span>
                            </div>
                        </div>
                        <div className="mt-3 space-y-2 bg-[#EFFDF4] text-xs p-3 rounded-md">
                            <div className="font-semibold tracking-wider text-sm"> Performance vs Targets</div>

                            <div className="flex justify-between  space-x-20 text-[#717182]">
                                <span className="flex grow justify-between ">
                                    <span>Yeild Target:</span>
                                    <span>8.0 t/ha</span>
                                </span>
                                <span className="flex grow justify-between ">
                                    <span> Time Target:</span>
                                    <span>9.0 hours</span>
                                </span>
                            </div>
                            <div className="flex justify-between  space-x-20 text-[#00763C]">
                                <span className="flex grow justify-between ">
                                    <span>Actual Yeild:</span>
                                    <span>8.2 t/ha</span>
                                </span>
                                <span className="flex grow justify-between ">
                                    <span> Actual Time :</span>
                                    <span>8h 45 min</span>
                                </span>
                            </div>
                        </div>


                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}
export default RobotMissionInfoPage