import { FormData } from "@/lib/interfaces/maps";
import { addFieldBoundaryAPI } from "@/lib/services/fields";
import { Coordinates, LocationInfo } from "@/types/dataTypes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddMissionForm from "../addMission";
import FieldFormPage from "./MapForm";
import AddBoundaryMAP from "./AddBoundaryMap";
const TOAST_CONFIG = {
    position: "top-right" as const,
    autoClose: 2000,
    style: {
        fontSize: '12px',
        color: '#065f46',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
};

const addFieldPage = () => {
    const navigate = useNavigate();
    const [formCoordinates, setFormCoordinates] = useState<Coordinates[]>([]);
    const [fieldAccessPoint, setFieldAccessPoint] = useState<Coordinates>(null);
    const [robot_home, setRobotHome] = useState<Coordinates>(null);
    const [mode, setMode] = useState<string>("idle");
    const [showAddMissionForm, setShowAddMissionForm] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<LocationInfo>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<FormData>({
        mode: 'onChange',
    });
    const { mutateAsync: mutateAddBoundary, isPending } = useMutation({
        mutationKey: ["add-field-boundary"],
        retry: 1,
        mutationFn: async (data: FormData) => {
            console.log(formCoordinates, "formCoordinates001");
            if (!formCoordinates.length) {
                console.log("satiii001", formCoordinates);
            }
            const payload = {
                field_name: data.field_name.trim(),
                field_boundary: formCoordinates,
                location: locationInfo?.location ?? "",
                field_area: locationInfo?.area ?? 0,
                field_access_point: fieldAccessPoint,
                robot_home: robot_home,
                centroid: locationInfo?.centroid || null
            };
            return await addFieldBoundaryAPI(payload);
        },
        onSuccess: () => {
            toast.success("Field registered successfully!");
            handleReset();
            setShowAddMissionForm(true);
        },
        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                const errorMessages = error?.data?.errors || {};
                console.log(errorMessages, "errorMessages001");
                setErrorMessages(errorMessages);
            }
        },
    });

    const onSubmit = useCallback(async (data: FormData) => {
        console.log(data, "fiels001");
        if (!formCoordinates.length) return toast.error("Please add field boundary");
        setErrorMessages([]);
        if (data)
            try {
                await mutateAddBoundary(data);
            } catch (error) {
                console.error("Form submission error:", error);
            }
    }, [formCoordinates, fieldAccessPoint, robot_home, mutateAddBoundary]);

    const handleReset = useCallback(() => {
        reset();
        setFormCoordinates([]);
        setFieldAccessPoint(null);
        setRobotHome(null);
        setLocationInfo(null);
        setMode("idle");
    }, [reset]);

    const handleAddAccessPoint = useCallback(() => {
        setMode("field_access_point");
        toast.info("Click on the map to place Field Access Point", TOAST_CONFIG);
    }, []);

    const handleRobotHome = useCallback(() => {
        setMode("robot_home");
        toast.info("Click on the map to place Robot Home Point", TOAST_CONFIG);
    }, []);

    const handleCancel = useCallback(() => {
        handleReset();
        navigate({
            to: "/all-fields",
        });

    }, [handleReset]);

    const displayArea = useMemo(() => {
        return locationInfo?.area ? Number(locationInfo.area).toFixed(2) : "0.00";
    }, [locationInfo?.area]);



    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0 z-0 w-full h-screen">
                <AddBoundaryMAP
                    setFormCoordinates={setFormCoordinates}
                    setFieldAccessPoint={setFieldAccessPoint}
                    setRobotHome={setRobotHome}
                    mode={mode}
                    setMode={setMode}
                    setLocationInfo={setLocationInfo}
                />
            </div>
            {showAddMissionForm ? (
                <AddMissionForm />
            ) : (
                <FieldFormPage
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    isPending={isPending}
                    errors={errors}
                    displayArea={displayArea}
                    handleAddAccessPoint={handleAddAccessPoint}
                    fieldAccessPoint={fieldAccessPoint}
                    handleRobotHome={handleRobotHome}
                    robot_home={robot_home}
                    handleCancel={handleCancel}
                    setAddMissionForm={setShowAddMissionForm}
                    errorMessages={errorMessages} />
            )}
        </div>
    );
}

export default addFieldPage;