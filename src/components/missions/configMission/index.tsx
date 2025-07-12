import { FC, useState } from "react";
import { ChevronDown, Plus, Router } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllRobotsAPI } from "@/lib/services/robots";
import { getAllFieldsAPI } from "@/lib/services/fields";
import DropDownPoper from "@/components/core/DropDownPoper";
import { Input } from "@/components/ui/input";
import { downloadJSONFromObject } from "@/lib/helpers/downloadJSONFromObject";
import { useNavigate } from "@tanstack/react-router";
export interface IAddMissionFormProps {
    viewFieldData: any
}
export interface FieldRowsSettings {
    RowSpacing: number,
    HeadLandWidth: number,
    RowPattern: string,
    StepSize: number

}
const
    AddMissionForm: FC<IAddMissionFormProps> = (props) => {
        const RowsPatternTypes = ["ParallelToLongstSide",
            "PerpendicularToLongestSide",
            "Angle@<theta>",
            "OptimizedForMaxSwathLength",
            "OptimizedForMinNumberOfTurns"
        ]
        const { viewFieldData } = props
        const navigate = useNavigate();
        const [robotsDropdown, setRobotsDropdown] = useState([])
        const [fieldRowsSettings, setFieldRowsSettings] = useState<FieldRowsSettings>({
            RowSpacing: 0,
            HeadLandWidth: 0,
            RowPattern: "",
            StepSize: 0,
        })
        const {
            data: allRobotsData,
            refetch,
            isLoading: isLoadingRobots
        } = useQuery({
            queryKey: [
                "all-rowPattrenTypes",
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
        const handleFetchEstimations = () => {
            const { field_access_point, robot_home, field_boundary, field_name, id: fieldId, } = viewFieldData.data
            const finalPathObject = {
                "field": {
                    "CityID": 0,
                    "LocationID": 0,
                    "FieldID": fieldId,
                    "FieldName": field_name,
                    "RobotHome": robot_home,
                    "FieldAccessPoint": field_access_point,
                    "FieldBoundary": field_boundary,
                },
                "FieldRowsSettings": {
                    "RowSpacing": fieldRowsSettings.RowSpacing,
                    "HeadLandWidth": fieldRowsSettings.HeadLandWidth,
                    "RowPattern": fieldRowsSettings.RowPattern,
                    "StepSize": fieldRowsSettings.StepSize
                }
            };

            downloadJSONFromObject(finalPathObject, `field_${fieldId}.json`);
            navigate({ to: "/" })
        };
        return (
            <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-6 w-[400px] h-[85vh] space-y-4 ">
                <h2 className="text-lg font-semibold">Configure Mission</h2>
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-600">Field Name</label>
                    <Input placeholder="Field Name" value={viewFieldData?.data?.field_name} disabled className="text-md font-bold text-black" />
                </div>
                {/* <div className="border rounded p-3 space-y-2 bg-gray-50">
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
            </div> */}
                {/* <DropDownPoper data={robotsDropdown} type="robots" isLoading={isLoadingRobots} /> */}


                <div className="flex gap-2">
                    <div className="relative w-1/2">
                        <label className="text-sm font-semibold text-gray-600">Rows Spacing</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Row Spacing"
                            value={fieldRowsSettings.RowSpacing}
                            onChange={(e) => setFieldRowsSettings({ ...fieldRowsSettings, RowSpacing: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="relative w-1/2">
                        <label className="text-sm font-semibold text-gray-600">Head Land Width</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Head Land Width"
                            value={fieldRowsSettings.HeadLandWidth}
                            onChange={(e) => setFieldRowsSettings({ ...fieldRowsSettings, HeadLandWidth: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="relative w-1/2">
                        <label className="text-sm font-semibold text-gray-600"> Steps Size</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Step Size"
                            value={fieldRowsSettings.StepSize}
                            onChange={(e) => setFieldRowsSettings({ ...fieldRowsSettings, StepSize: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                {robotsDropdown && (
                    <DropDownPoper data={RowsPatternTypes} type="rowPattren" isLoading={isLoadingRobots} />
                )}





                <button className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full" onClick={handleFetchEstimations}>
                    Create Mission                </button>
                {/* <div className="bg-gray-100 rounded p-4">
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
            </div> */}
            </div>
        );
    };

export default AddMissionForm;
