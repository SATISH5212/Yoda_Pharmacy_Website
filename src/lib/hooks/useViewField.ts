import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getSingleFieldAPI } from "@/lib/services/fields";
import covertXYToLatLng from "../helpers/distanceToLatLong";

export type Coordinates = {
    lat: number;
    lng: number;
};

export const useViewField = () => {
    const { field_id } = useParams({ strict: false });
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [calculatedArea, setCalculatedArea] = useState<string>("");
    const [fetchEstimationsData, setFetchEstimationsData] = useState<any | null>(null);
    const [pathGeneratored, setPathGeneratored] = useState(false);
    const [robotType, setRobotType] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<Coordinates>({
        lat: fetchEstimationsData?.mission?.RobotHome?.lat,
        lng: fetchEstimationsData?.mission?.RobotHome?.lng
    });

    const {
        data: viewFieldData,
        isLoading,
    } = useQuery({
        queryKey: ["view-fieldData", field_id],
        queryFn: async () => {
            if (!field_id) throw new Error("field_id is undefined");
            const response = await getSingleFieldAPI({ field_id });
            if (response?.status === 200 || response?.status === 201) {
                return response.data;
            }
            throw new Error("Failed to fetch gateways");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: !!field_id,
    });

    useEffect(() => {
        if (viewFieldData?.data?.field_boundary?.length > 0) {
            setMapCenter(viewFieldData?.data?.centroid);
            setCalculatedArea(viewFieldData?.data?.field_area);
        }
    }, [viewFieldData]);

    const polygonOptions = useMemo(() => ({
        fillColor: "#0738022b",
        fillOpacity: 0.4,
        strokeColor: "#10f267ff",
        strokeWeight: 2,
        clickable: true,
        editable: false,
        draggable: false,
    }), []);

    const handlePolygonClick = useCallback(() => {
        setShowInfoWindow(prev => !prev);
    }, []);

    const pathForFeildAccessPoint = useMemo(() => {
        if (!pathGeneratored || !fetchEstimationsData?.mission) return [];
        const coordinates: Coordinates[] = [];
        const robotHome = fetchEstimationsData?.mission?.RobotHome;
        if (!robotHome) return coordinates;
        coordinates.push({
            lat: robotHome.lat,
            lng: robotHome.lng,
        });
        fetchEstimationsData?.mission?.GoToField?.forEach((segment: any[]) => {
            segment.forEach((waypoint) => {
                const { lat, lng } = covertXYToLatLng(
                    robotHome.lat,
                    robotHome.lng,
                    waypoint.x,
                    waypoint.y
                );
                coordinates.push({ lat, lng });
            });
        });

        return coordinates;
    }, [covertXYToLatLng, fetchEstimationsData, pathGeneratored]);

    const pathForRobotMove = useMemo(() => {
        if (!pathGeneratored || !fetchEstimationsData?.mission) return [];
        const coordinates: Coordinates[] = [];
        const robotHome = fetchEstimationsData?.mission?.RobotHome;
        if (!robotHome) return coordinates;
        fetchEstimationsData?.mission?.NavigateRows?.forEach((segment: any[]) => {
            segment.forEach((waypoint) => {
                const { lat, lng } = covertXYToLatLng(
                    robotHome.lat,
                    robotHome.lng,
                    waypoint.x,
                    waypoint.y
                );
                coordinates.push({ lat, lng });
            });
        });

        return coordinates;
    }, [covertXYToLatLng, fetchEstimationsData, pathGeneratored]);

    const pathForRobotHome = useMemo(() => {
        if (!pathGeneratored || !fetchEstimationsData?.mission) return [];
        const coordinates: Coordinates[] = [];
        const robotHome = fetchEstimationsData?.mission?.RobotHome;
        if (!robotHome) return coordinates;
        const lastSegment = fetchEstimationsData?.mission?.GoToHome?.[fetchEstimationsData?.mission?.GoToHome?.length - 1];
        if (!lastSegment) return coordinates;
        lastSegment.forEach((waypointGroup: any) => {
            waypointGroup.forEach((waypoint: any) => {
                const { lat, lng } = covertXYToLatLng(
                    robotHome.lat,
                    robotHome.lng,
                    waypoint.x,
                    waypoint.y
                );
                coordinates.push({ lat, lng });
            });
        });

        return coordinates;
    }, [covertXYToLatLng, fetchEstimationsData, pathGeneratored]);

    const homeToFieldOptions = {
        strokeColor: "#FFC107",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
    };

    const robotPathOptions = {
        strokeColor: robotType === "DEMETER_MINI" ? "#fff6f6ff" : "#4aa4e9ff",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
    };

    const robotPathToHomeOptions = {
        strokeColor: '#6C757D',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
    };

    const shouldShowPaths = pathGeneratored && fetchEstimationsData?.mission;

    return {
        viewFieldData,
        isLoading,
        showInfoWindow,
        calculatedArea,
        fetchEstimationsData,
        pathGeneratored,
        robotType,
        mapCenter,
        polygonOptions,
        handlePolygonClick,
        pathForFeildAccessPoint,
        pathForRobotMove,
        pathForRobotHome,
        homeToFieldOptions,
        robotPathOptions,
        robotPathToHomeOptions,
        shouldShowPaths,
        setFetchEstimationsData,
        setPathGeneratored,
        setRobotType
    };
};