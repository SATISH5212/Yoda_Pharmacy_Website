import { AppProps, Coordinates, LocationInfo } from "@/types/dataTypes";
import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DrawTools from "@/components/google-map";
import { useMutation } from "@tanstack/react-query";
import { addFieldBoundaryAPI } from "@/lib/services/fields";
import { useNavigate } from "@tanstack/react-router";
import { FormData } from "@/lib/interfaces/maps";
import FieldFormPage from "./MapForm";
import AddMissionForm from "../addMission";
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

const MapFormPage = () => {
    const navigate = useNavigate();
    const [formCoordinates, setFormCoordinates] = useState<Coordinates[]>([]);
    const [fieldAccessPoint, setFieldAccessPoint] = useState<Coordinates>(null);
    const [robot_home, setRobotHome] = useState<Coordinates>(null);
    const [mode, setMode] = useState<string>("idle");
    const [showAddMissionForm, setShowAddMissionForm] = useState<boolean>(false);
    const [locationInfo, setLocationInfo] = useState<LocationInfo>(null);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid }
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            field_name: ''
        }
    });
    const fieldName = watch('field_name');
    const { mutateAsync: mutateAddBoundary, isPending } = useMutation({
        mutationKey: ["add-field-boundary"],
        retry: 1,
        mutationFn: async (data: FormData) => {
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
            // handleReset();
            // setField(false);
            setShowAddMissionForm(true);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to register field";
            toast.error(errorMessage);
            console.error("Mutation error:", error);
        }
    });

    const onSubmit = useCallback(async (data: FormData) => {
        if (!formCoordinates.length) {
            toast.error("Please draw field boundary on the map");
            return;
        }

        if (!fieldAccessPoint) {
            toast.error("Please set field access point");
            return;
        }

        if (!robot_home) {
            toast.error("Please set robot home point");
            return;
        }
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

    const isSubmittable = useMemo(() => {
        return isValid &&
            fieldName?.trim() &&
            formCoordinates.length > 0 &&
            fieldAccessPoint !== null &&
            robot_home !== null &&
            !isPending;
    }, [isValid, fieldName, formCoordinates.length, fieldAccessPoint, robot_home, isPending]);

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0 z-0 w-full h-screen">
                <DrawTools
                    setFormCoordinates={setFormCoordinates}
                    setFieldAccessPoint={setFieldAccessPoint}
                    setRobotHome={setRobotHome}
                    mode={mode}
                    setMode={setMode}
                    setLocationInfo={setLocationInfo}
                />
            </div>
            {/* {!showAddMissionForm ? ( */}
            <AddMissionForm />
            {/* ) : ( */}

            {/* <FieldFormPage handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} isPending={isPending} errors={errors} displayArea={displayArea} handleAddAccessPoint={handleAddAccessPoint} fieldAccessPoint={fieldAccessPoint} handleRobotHome={handleRobotHome} robot_home={robot_home} isSubmittable={isSubmittable} handleCancel={handleCancel} setAddMissionForm={setShowAddMissionForm} /> */}
            {/* )} */}
        </div>
    );
}

export default MapFormPage;