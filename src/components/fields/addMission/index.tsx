import { FC, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllRobotsAPI } from "@/lib/services/robots";
import { getAllFieldsAPI } from "@/lib/services/fields";
import DropDownPoper from "@/components/core/DropDownPoper";

const AddMissionForm: FC = () => {
    const [robotsDropdown, setRobotsDropdown] = useState([])
    const [fieldsDropdown, setFieldsDropdown] = useState([])
    const {
        data: allRobotsData,
        refetch,
        isLoading: isLoadingRobots
    } = useQuery({
        queryKey: [
            "all-robotsData",
        ],
        queryFn: async () => {

            const response = await getAllRobotsAPI();
            if (response?.status === 200 || response?.status === 201) {
                setRobotsDropdown(response.data.data.records)
                return response.data;
            }
            throw new Error("Failed to fetch robots");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });
    const {
        data: allFieldsData,
        isLoading: isLoadingFields,
    } = useQuery({
        queryKey: [
            "all-fieldsData",
        ],
        queryFn: async () => {

            const response = await getAllFieldsAPI();
            if (response?.status === 200 || response?.status === 201) {
                setFieldsDropdown(response.data.data.records)
                return response.data;
            }
            throw new Error("Failed to fetch robots");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });

    return (
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-6 w-[400px] h-[85vh] space-y-4 ">
            <h2 className="text-lg font-semibold">Register Fields</h2>
            <div className="flex justify-between items-center">
                <DropDownPoper data={fieldsDropdown} type="fields" isLoading={isLoadingFields} />
                <button className="ml-2 text-green-600 text-sm flex items-center">
                    <Plus size={16} className="mr-1" /> Add New
                </button>
            </div>

            <div className="flex justify-between items-center">
                <DropDownPoper data={robotsDropdown} type="robots" isLoading={isLoadingRobots} />
                <button className="ml-2 text-green-600 text-sm flex items-center">
                    <Plus size={16} className="mr-1" /> Add New
                </button>
            </div>
            <div className="border rounded p-3 space-y-2 bg-gray-50">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">XAG’s P100 Pro</span>
                    <button className="text-gray-600">
                        📹
                    </button>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>🟧 100%</span>
                    <span>❌ 80%</span>
                    <span>🔋 100%</span>
                    <span>📍 100%</span>
                </div>
            </div>

            <span className="text-md font-semibold text-gray-600">Select Implement</span>
            <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="select Implement"

            />

            {/* Select Operation & Pattern */}
            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"


                    />
                    <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <div className="relative w-1/2">
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"


                    />
                    <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
            </div>


            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"


                    />
                    <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <div className="relative w-1/2">
                    <input
                        className="w-full border rounded px-3 py-2 text-sm"

                        disabled
                    />
                </div>
            </div>

            <button className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full">
                Fetch Estimations
            </button>
            <div className="bg-gray-100 rounded p-4">
                <h3 className="text-sm font-semibold mb-2">Estimated</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white rounded p-2">🔋 Battery</div>
                    <div className="bg-white rounded p-2">⏳ Time</div>
                    <div className="bg-white rounded p-2">⬍ Swat length</div>
                    <div className="bg-white rounded p-2">🧪 Pesticides</div>
                    <div className="bg-white rounded p-2 col-span-2">⛽ Fuel</div>
                </div>

                <div className="mt-3 text-xs text-blue-600 font-medium">
                    Operating Parameters<br />
                    6.2 L/acres, 3.5 m, 5.0 m/s
                </div>
            </div>
        </div>
    );
};

export default AddMissionForm;
