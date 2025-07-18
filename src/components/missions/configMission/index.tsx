import DropDownPoper from "@/components/core/DropDownPoper";
import { Input } from "@/components/ui/input";
import { FieldRowsSettings, IAddMissionFormProps } from "@/lib/interfaces/missions";
import { addFieldMissionAPI } from "@/lib/services/missions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { FC, useState } from "react";
import { toast } from "sonner";
const ROW_PATTERN_OPTIONS = [
    "ParallelToLongstSide",
    "PerpendicularToLongestSide",
    "Angle@<theta>",
    "OptimizedForMaxSwathLength",
    "OptimizedForMinNumberOfTurns"
];

const AddMissionForm: FC<IAddMissionFormProps> = ({ viewFieldData }) => {
    const { field_id } = useParams({ strict: false });
    const [settings, setSettings] = useState<FieldRowsSettings>({ RowPattern: "" });
    const [angle, setAngle] = useState<number | null>(null);
    const [showAngleInput, setShowAngleInput] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [missionName, setMissionName] = useState<string>("");

    const { mutateAsync: createMission, isPending } = useMutation({
        mutationKey: ["add-field-mission"],
        mutationFn: (payload: any) => addFieldMissionAPI(field_id as string, payload),
        retry: false,
        onSuccess: () => toast.success("Mission registered successfully!"),
        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                setErrors(error?.data?.errors || {});
                console.log("Validation Errors:", error?.data?.errors);
            }
        },
    });

    const handleInputChange = (field: keyof FieldRowsSettings, value: number) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleRowPatternChange = (pattern: string) => {
        setSettings(prev => ({ ...prev, RowPattern: pattern }));
        setShowAngleInput(pattern === "Angle@<theta>");
    };

    const validateForm = () => {
        if (settings.RowPattern === "Angle@<theta>" && (angle === null || angle === undefined)) {
            setErrors(prev => ({
                ...prev,
                rowPattrenAngle: "Please enter an angle value for the row pattern"
            }));
            return false;
        }
        return true;
    };

    const buildPayload = () => {
        const { field_access_point, robot_home, field_boundary, field_name, id: fieldId } = viewFieldData.data;
        return {
            mission_name: missionName,
            Field: {
                "CityID": 0,
                "LocationID": 1,
                "FieldID": 10,
                "FieldName": field_name,
                "RobotHome": robot_home,
                "FieldAccessPoint": field_access_point,
                "FieldBoundary": field_boundary,
            },
            FieldRowsSettings: {
                ...settings,
                RowPattern: settings.RowPattern === "Angle@<theta>" && angle !== null
                    ? `Angle@${angle}deg`
                    : settings.RowPattern
            },
        };
    };


    const clearFieldError = (field: string) => {
        setErrors((prev: any) => ({
            ...prev,
            [field]: null,
        }));
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        createMission(buildPayload());
    };

    return (
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-6 w-[400px] h-[85vh] space-y-4">
            <h2 className="text-lg font-semibold">Configure Mission</h2>

            <div className="flex justify-center items-center gap-9">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Field Name</label>
                <Input
                    value={viewFieldData?.data?.field_name}
                    disabled
                    className="fle text-md font-bold text-black"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <label className="text-sm font-semibold text-gray-600 w-1/2">Mission Name</label>
                    <Input
                        value={missionName}
                        className="text-md font-bold text-black"
                        onChange={(e) => {
                            setMissionName(e.target.value)
                            clearFieldError("mission_name");
                        }}
                    />
                </div>
                <div className="ml-29">
                    {
                        errors.mission_name && (
                            <p className=" text-red-500 text-xs">{errors.mission_name}</p>
                        )
                    }
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Row Spacing</label>
                    <Input
                        type="number"
                        placeholder="Row Spacing"
                        value={settings.RowSpacing ?? ""}
                        onChange={(e) => {
                            handleInputChange("RowSpacing", parseFloat(e.target.value))
                            clearFieldError("RowSpacing");
                        }}
                    />
                    <span className="text-red-500 text-xs h-4">
                        {errors.RowSpacing}
                    </span>
                </div>

                <div className="w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Head Land Width</label>
                    <Input
                        type="number"
                        placeholder="Head Land Width"
                        value={settings.HeadLandWidth ?? ""}
                        onChange={(e) => {
                            handleInputChange("HeadLandWidth", parseFloat(e.target.value))
                            clearFieldError("HeadLandWidth");
                        }}
                    />
                    <span className="text-red-500 text-xs h-2">
                        {errors.HeadLandWidth}
                    </span>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Step Size</label>
                    <Input
                        type="number"
                        placeholder="Step Size"
                        value={settings.StepSize ?? ""}
                        onChange={(e) => {
                            handleInputChange("StepSize", parseFloat(e.target.value))
                            clearFieldError("StepSize");
                        }}
                    />
                    <span className="text-red-500 text-xs h-4">
                        {errors.StepSize}
                    </span>
                </div>
                <div className="w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Row Pattern</label>
                    <DropDownPoper
                        data={ROW_PATTERN_OPTIONS}
                        type="rowPattren"
                        value={settings.RowPattern}
                        onSelect={handleRowPatternChange}
                        isLoading={false}
                    />
                    <span className="text-red-500 text-xs ">
                        {errors.RowPattern}
                    </span>

                    {showAngleInput && (
                        <div className="w-full mt-2">
                            <label className="text-sm font-semibold text-gray-600 ">Row Pattern Angle</label>
                            <Input
                                type="number"
                                placeholder="Enter Angle in degrees"
                                onChange={(e) => { setAngle(parseFloat(e.target.value)) }}
                            />
                        </div>
                    )}
                </div>

            </div>

            <button
                className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"
                onClick={handleSubmit}
                disabled={isPending}
            >
                {isPending ? "Creating..." : "Create Mission"}
            </button>
        </div>
    );
};

export default AddMissionForm;
