import DropDownPoper from "@/components/core/DropDownPoper";
import { FieldRowsSettings, IAddMissionFormProps, IAddRobotFormProps } from "@/lib/interfaces/missions";
import { addFieldMissionAPI } from "@/lib/services/missions";
import { getFieldPathEstimationsAPI } from "@/lib/services/robots";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

import { FC, useState } from "react";
import { toast } from "sonner";

const robotTypes = ["DEMETER_MINI", "DEMETER_MAXI"];

const FieldAllMissions: FC<IAddRobotFormProps> = (props) => {
    const { viewFieldData, setFetchEstimationsData, setPathGeneratored, robotType, setRobotType } = props;
    const [loadingMissions, setLoadingMissions] = useState<Set<number>>(new Set());

    const [missionRobotTypes, setMissionRobotTypes] = useState<Record<number, string>>({});

    const [selectedMissionId, setSelectedMissionId] = useState<number>();
    const [fieldRowsSettings, setFieldRowsSettings] = useState<FieldRowsSettings>({
        RowSpacing: undefined,
        HeadLandWidth: undefined,
        RowPattern: "",
        StepSize: undefined,
    });

    const { mutate: fetchEstimations } = useMutation({
        mutationFn: async (params: { missionId: number; robotType: string }) => {
            const { missionId, robotType } = params;

            setLoadingMissions(prev => new Set(prev).add(missionId));

            const payload = {
                "mission_id": missionId,
                "robot_type": robotType
            }
            const response = await getFieldPathEstimationsAPI(payload);
            const s3Url = response?.data?.data?.download_url;
            const s3Response = await fetch(s3Url);
            const jsonData = await s3Response.json();
            setFetchEstimationsData(jsonData);
            setPathGeneratored(true);
            return s3Url;
        },

        onSuccess: (parsedData) => {

        },

        onError: (err) => {
            console.error("Error fetching or parsing YAML:", err);
        },

        onSettled: (data, error, variables) => {
            setLoadingMissions(prev => {
                const newSet = new Set(prev);
                newSet.delete(variables.missionId);
                return newSet;
            });
        }
    });

    const handleMissionSelect = (selectedMission: any | null) => {
        console.log(selectedMission, "wwww001");
        setSelectedMissionId(selectedMission?.id);
        if (selectedMission) {
            setFieldRowsSettings({
                RowSpacing: selectedMission.row_spacing,
                HeadLandWidth: selectedMission.buffer_zone_width,
                RowPattern: selectedMission.row_pattern,
                StepSize: selectedMission.step_size,
            });
        } else {
            setFieldRowsSettings({
                RowSpacing: undefined,
                HeadLandWidth: undefined,
                RowPattern: "",
                StepSize: undefined,
            });
        }
    };
    const handleSelectRobot = (missionId: number, selectedRobot: string) => {
        setMissionRobotTypes(prev => ({
            ...prev,
            [missionId]: selectedRobot
        }));
    }

    const handleFetchEstimations = async (mission: any) => {
        const robotType = missionRobotTypes[mission.id];

        if (!robotType) {
            toast.error("Please select a robot type first");
            return;
        }

        console.log(mission.id, robotType, "wwww002");
        setFetchEstimationsData(null);
        handleMissionSelect(mission);
        await fetchEstimations({ missionId: mission.id, robotType });
    };

    console.log(viewFieldData?.data, "viewFieldData");

    return (
        <div className="absolute z-10 top-4  bg-white shadow-2xl rounded-2xl p-3 w-[400px] h-[85vh] overflow-y-auto space-y-2">
            <h2 className="text-lg font-semibold mb-2">Active Missions</h2>


            {(!viewFieldData?.data?.missions || viewFieldData.data.missions.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No missions exist</p>
                </div>
            ) : (
                viewFieldData.data.missions.map((mission: any, index: number) => {
                    const isThisMissionLoading = loadingMissions.has(mission.id);

                    return (
                        <div
                            key={index}
                            className="rounded-xl p-4 shadow-sm hover:shadow-md  transition-all duration-200 text-sm 
                            bg-green-50 border border-green-400"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-semibold text-green-800">{mission.mission_name}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-gray-700">
                                <div>
                                    <p className="text-gray-500">Row Spacing</p>
                                    <p className="text-gray-900 font-medium">{mission.row_spacing}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Row Pattern</p>
                                    <p className="text-gray-900 font-medium">{mission.row_pattern}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Step Size</p>
                                    <p className="text-gray-900 font-medium">{mission.step_size}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Buffer Zone</p>
                                    <p className="text-gray-900 font-medium">{mission.buffer_zone_width}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <DropDownPoper
                                    data={robotTypes}
                                    type="robots"
                                    isLoading={false}
                                    onSelect={(selectedRobot: string) => handleSelectRobot(mission.id, selectedRobot)}
                                />
                                <button
                                    onClick={() => handleFetchEstimations(mission)}
                                    disabled={isThisMissionLoading}
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-2 rounded disabled:opacity-60 hover:cursor-pointer "
                                >
                                    {isThisMissionLoading ? (
                                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                                    ) : (
                                        "Fetch Estimations"
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div >
    );
};

export default FieldAllMissions;