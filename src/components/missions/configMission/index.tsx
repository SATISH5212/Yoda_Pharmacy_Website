import DropDownPoper from "@/components/core/DropDownPoper";
import { FieldRowsSettings, IAddMissionFormProps } from "@/lib/interfaces/missions";
import { addFieldMissionAPI } from "@/lib/services/missions";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { FC, useState, ChangeEvent } from "react";
import { toast } from "sonner";
const ROW_PATTERN_OPTIONS = [
    "ParallelToLongstSide",
    "PerpendicularToLongestSide",
    "Angle@<theta>",
    "OptimizedForMaxSwathLength",
    "OptimizedForMinNumberOfTurns"
];

const AddMissionForm: FC<IAddMissionFormProps> = (props) => {
    const { viewFieldData, setShowAddMissionPage } = props;
    const { field_id } = useParams({ strict: false });
    const navigate = useNavigate();
    const location = useLocation();
    const [settings, setSettings] = useState<FieldRowsSettings>({ RowPattern: "" });
    const [angle, setAngle] = useState<number | null>(null);
    const [showAngleInput, setShowAngleInput] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [missionName, setMissionName] = useState<string>("");
    const [missionData, setMissionData] = useState<any>(null);
    const QueryClient = useQueryClient();

    const { mutateAsync: createMission, isPending } = useMutation({
        mutationKey: ["add-field-mission"],
        mutationFn: (payload: any) => addFieldMissionAPI(field_id as string, payload),
        retry: false,

        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ["view-fieldData"] });
            toast.success("Mission registered successfully!");
            if (location?.pathname?.includes("/config-mission")) {
                setTimeout(() => {
                    navigate({ to: "/all-fields" })
                }, 1000)
            } else {
                setShowAddMissionPage(false);
                setMissionData(null)
            }
        },
        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                setErrors(error?.data?.errors || {});
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
        const builtPayload = {
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

        setMissionData(builtPayload)
        return builtPayload;
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
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-5 w-[400px] h-[85vh] space-y-4 border border-green-200">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-green-700">Configure Robot Mission</h2>
                <button
                    onClick={() => {
                        if (location?.pathname?.includes("/config-mission")) {
                            navigate({ to: "/all-fields" });
                        } else {
                            setShowAddMissionPage(false);
                        }
                    }}
                    className="text-red-500 font-bold text-lg hover:text-red-600"
                >
                    ×
                </button>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-600 w-1/3">Field</label>
                <input
                    value={viewFieldData?.data?.field_name}
                    disabled
                    className="text-sm font-semibold text-black bg-gray-100 rounded px-3 py-1 w-full"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Mission Name</label>
                <input
                    value={missionName}
                    placeholder="Enter Mission Name"
                    className="text-sm font-semibold text-black bg-gray-100 rounded px-3 py-1 w-full"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMissionName(e.target.value);
                        clearFieldError("mission_name");
                    }}
                />
                {errors.mission_name && (
                    <p className="text-red-500 text-xs">{errors.mission_name}</p>
                )}
            </div>
            <div className="border-t pt-3 ">
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="text-xs font-semibold text-gray-600">Row Spacing</label>
                        <input
                            type="number"
                            placeholder="Enter Row Spacing"
                            value={settings.RowSpacing ?? ""}
                            className="bg-gray-100 rounded px-3 py-1 w-full text-sm"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleInputChange("RowSpacing", parseFloat(e.target.value));
                                clearFieldError("RowSpacing");
                            }}
                        />
                        <p className="text-red-500 text-xs">{errors.RowSpacing}</p>
                    </div>

                    <div className="w-1/2">
                        <label className="text-xs font-semibold text-gray-600">Headland Width</label>
                        <input
                            type="number"
                            placeholder="Enter Headland Width"
                            value={settings.HeadLandWidth ?? ""}
                            className="bg-gray-100 rounded px-3 py-1 w-full text-sm"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleInputChange("HeadLandWidth", parseFloat(e.target.value));
                                clearFieldError("HeadLandWidth");
                            }}
                        />
                        <p className="text-red-500 text-xs">{errors.HeadLandWidth}</p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <label className="text-xs font-semibold text-gray-600">Step Size</label>
                        <input
                            type="number"
                            placeholder="Enter Step Size"
                            value={settings.StepSize ?? ""}
                            className="bg-gray-100 rounded px-3 py-1 w-full text-sm"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleInputChange("StepSize", parseFloat(e.target.value));
                                clearFieldError("StepSize");
                            }}
                        />
                        <p className="text-red-500 text-xs">{errors.StepSize}</p>
                    </div>


                </div>
            </div>


            <div className="flex justify-between space-x-4">
                <div className="">
                    <label className="text-xs font-semibold text-gray-600">Row Pattern</label>
                    <DropDownPoper
                        data={ROW_PATTERN_OPTIONS}
                        type="rowPattren"
                        value={settings.RowPattern}
                        onSelect={handleRowPatternChange}
                        isLoading={false}
                    />
                    <p className="text-red-500 text-xs">{errors.RowPattern}</p>
                </div>
                {showAngleInput && (
                    <div className="">
                        <label className="text-xs font-semibold text-gray-600">Row Pattern Angle (°)</label>
                        <input
                            type="number"
                            placeholder="Enter angle"
                            className="bg-gray-100 rounded px-3 py-1 w-full text-sm"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAngle(parseFloat(e.target.value))
                            }
                        />
                    </div>
                )}


            </div>

            <button
                className="bg-green-600 text-white text-sm font-semibold rounded py-2 px-4 w-full mt-4 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isPending}
            >
                {isPending ? (
                    <span className="flex justify-center items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Creating...
                    </span>
                ) : (
                    "Create Mission"
                )}
            </button>
        </div>
    );

};

export default AddMissionForm;
