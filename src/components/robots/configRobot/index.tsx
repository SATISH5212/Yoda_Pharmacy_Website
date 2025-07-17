import DropDownPoper from "@/components/core/DropDownPoper";
import { Input } from "@/components/ui/input";
import { FieldRowsSettings, IAddMissionFormProps, IAddRobotFormProps } from "@/lib/interfaces/missions";
import { getFieldPathEstimationsAPI } from "@/lib/services/robots";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, use, useState } from "react";
import yaml from "js-yaml";


const ConfigRobotForm: FC<IAddRobotFormProps> = (props) => {
    const { viewFieldData, setFetchEstimationsData, setPathGeneratored } = props;
    const robotTypes = ["DEMETER_MINI", "DEMETER_MAXI"];
    const [selectedMissionId, setSelectedMissionId] = useState<number>();
    const [robotType, setRobotType] = useState<number>();
    const [fieldRowsSettings, setFieldRowsSettings] = useState<FieldRowsSettings>({
        RowSpacing: undefined,
        HeadLandWidth: undefined,
        RowPattern: "",
        StepSize: undefined,
    });
    // const {
    //     data: estimationsPathData,
    //     refetch: refetchEstimations,
    // } = useQuery({
    //     queryKey: ["fetch-estimations"],
    //     queryFn: async () => {
    //         if (!selectedMissionId || !robotType) return
    //         const response = await getFieldPathEstimationsAPI(selectedMissionId.toString(), robotType.toString());
    //         console.log(response, "linkkkk")

    //         throw new Error("Failed to fetch estimations");
    //     },
    //     enabled: false,
    // })


    const { mutate: fetchEstimations } = useMutation({
        mutationFn: async () => {
            console.log("fetchingestimations00101", selectedMissionId, robotType);

            if (!selectedMissionId || !robotType) return;

            // Step 1: Call your API to get the YAML S3 download link
            const response = await getFieldPathEstimationsAPI(
                selectedMissionId.toString(),
                robotType.toString()
            );

            const yamlFileUrl = response?.data?.data?.download_url;
            console.log(yamlFileUrl, "YAML file URL from API");
            console.log("satii001");

            if (!yamlFileUrl) {
                console.log("satii002");
                throw new Error("YAML file URL not received");
            }
            console.log("satii003");
            // Step 2: Fetch the actual YAML content from the S3 URL
            const fileRes = await fetch(yamlFileUrl);
            console.log("satii004");

            if (!fileRes.ok) {
                throw new Error(`Failed to fetch YAML file: ${fileRes.status}`);
            }
            console.log("satii005");


            // Step 3: Convert file (Blob) → Text → JSON
            const blob = await fileRes.blob();
            console.log(blob, "satii006");
            const yamlText = await blob.text();
            console.log(yamlText, "satii007");
            const parsedData = yaml.load(yamlText);
            console.log(parsedData, "satii008");
            setFetchEstimationsData(parsedData);
            setPathGeneratored(true);


            console.log("Parsed YAML → JSON:", parsedData);

            return parsedData; // if you want access in `onSuccess`
        },

        onSuccess: (parsedData) => {
            // Handle the converted JSON object here
            console.log("YAML Data as JSON Object:", parsedData);
            // Optionally set state, navigate, etc.
        },

        onError: (err) => {
            console.error("Error fetching or parsing YAML:", err);
        },
    });



    const handleMissionSelect = (selectedMission: any | null) => {
        console.log(selectedMission, "fetchingestimations0010111")
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


    const handleSelectRobot = (selectedRobot: string) => {
        console.log(selectedRobot, "setra")
        if (selectedRobot == "DEMETER_MINI") {
            setRobotType(0)
        } else {
            setRobotType(1)
        }

    }
    const handleFetchEstimations = async () => {
        console.log("fetchingestimations001")
        await fetchEstimations()

    };

    return (
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-6 w-[400px] h-[85vh] space-y-4">
            <h2 className="text-lg font-semibold">Configure Robot</h2>
            <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-600">Field Name</label>
                <Input
                    placeholder="Field Name"
                    value={viewFieldData?.data?.field_name}
                    disabled
                    className="text-md font-bold text-black"
                />
            </div>
            <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-600">Select Mission</label>
                {viewFieldData && (
                    <DropDownPoper
                        data={viewFieldData.data.missions}
                        type="missions"
                        isLoading={false}
                        onSelect={handleMissionSelect}
                    />
                )}
            </div>
            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Rows Spacing</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Row Spacing"
                        value={fieldRowsSettings.RowSpacing}
                        disabled
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Head Land Width</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Head Land Width"
                        value={fieldRowsSettings.HeadLandWidth}
                        disabled
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Rows Pattern</label>
                    <Input
                        type="text"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Row Pattern"
                        value={fieldRowsSettings.RowPattern}
                        disabled
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Steps Size</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Step Size"
                        value={fieldRowsSettings.StepSize}
                        disabled
                    />
                </div>
            </div>

            <DropDownPoper data={robotTypes} type="robots" isLoading={false} onSelect={handleSelectRobot} />

            <button
                className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full hover:cursor-pointer"
                onClick={handleFetchEstimations}
            >
                Fetch Estimations
            </button>
        </div>
    );
};

export default ConfigRobotForm;