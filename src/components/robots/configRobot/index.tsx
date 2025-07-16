import DropDownPoper from "@/components/core/DropDownPoper";
import { Input } from "@/components/ui/input";
import { FieldRowsSettings, IAddMissionFormProps } from "@/lib/interfaces/missions";
import { FC, useState } from "react";

const ConfigRobotForm: FC<IAddMissionFormProps> = (props) => {
    const { viewFieldData } = props;
    const robotType = ["DEMETER_MINI", "DEMETER_MAXI"];
    const [fieldRowsSettings, setFieldRowsSettings] = useState<FieldRowsSettings>({
        RowSpacing: undefined,
        HeadLandWidth: undefined,
        RowPattern: "",
        StepSize: undefined,
    });

    const handleMissionSelect = (selectedMission: any | null) => {
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

    const handleFetchEstimations = () => {

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

            <DropDownPoper data={robotType} type="robots" isLoading={false} />

            <button
                className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full"
                onClick={handleFetchEstimations}
            >
                Fetch Estimations
            </button>
        </div>
    );
};

export default ConfigRobotForm;