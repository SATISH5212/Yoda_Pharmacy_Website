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
    const [mode, setMode] = useState<string>("idle");
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
                robot_home: fieldAccessPoint,
            };
            return await addFieldBoundaryAPI(payload);
        },
        onSuccess: () => {
            toast.success("Field registered successfully!");
            handleReset();
            // setField(false);
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

        try {
            await mutateAddBoundary(data);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    }, [formCoordinates, fieldAccessPoint, mutateAddBoundary]);

    const handleReset = useCallback(() => {
        reset();
        setFormCoordinates([]);
        setFieldAccessPoint(null);
        setLocationInfo(null);
        setMode("idle");
    }, [reset]);

    const handleAddAccessPoint = useCallback(() => {
        setMode("field_access_point");
        toast.info("Click on the map to place Field Access Point", TOAST_CONFIG);
    }, []);

    const handleCancel = useCallback(() => {
        handleReset();
        navigate({
            to: "/fields",
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
            !isPending;
    }, [isValid, fieldName, formCoordinates.length, fieldAccessPoint, isPending]);

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0 z-0 w-full h-screen">
                <DrawTools
                    setFormCoordinates={setFormCoordinates}
                    setFieldAccessPoint={setFieldAccessPoint}
                    mode={mode}
                    setMode={setMode}
                    setLocationInfo={setLocationInfo}
                />
            </div>
            <FieldFormPage
                handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} isPending={isPending} errors={errors} displayArea={displayArea} handleAddAccessPoint={handleAddAccessPoint} fieldAccessPoint={fieldAccessPoint} isSubmittable={isSubmittable} handleCancel={handleCancel} />
        </div>
    );
}

export default MapFormPage;