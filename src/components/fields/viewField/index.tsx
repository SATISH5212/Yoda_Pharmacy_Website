import AddRobotForm from "@/components/robots/configRobot";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { IViewFieldPageProps } from "@/lib/interfaces/maps";
import { getSingleFieldAPI } from "@/lib/services/fields";
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    Polygon,
    Polyline,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import {
    useLocation,
    useParams
} from "@tanstack/react-router";
import { MapPin, Square } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import AddMissionForm from "../../missions/configMission";
import { Waypoint } from "../viewPath";

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};

const DEFAULT_ZOOM = 20;
const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "places",
    "geocoding",
];
export type Coordinates = {
    lat: number,
    lng: number
};
const ViewFieldPage: FC<IViewFieldPageProps> = () => {
    const { field_id } = useParams({ strict: false });
    const location = useLocation()
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [calculatedArea, setCalculatedArea] = useState<string>("");
    const [fetchEstimationsData, setFetchEstimationsData] = useState<any | null>(null);
    const [pathGeneratored, setPathGeneratored] = useState(false)
    const DEFAULT_CENTER = {
        lat: fetchEstimationsData?.mission?.RobotHome?.lat,
        lng: fetchEstimationsData?.mission?.RobotHome?.lng
    };

    const [finalPath, setFinalPath] = useState({})
    const [robotType, setRobotType] = useState<string>("");
    console.log(robotType, "robotType")
    useEffect(() => {
        if (fetchEstimationsData) {
            setFinalPath(fetchEstimationsData);
        }
        setMapCenter(viewFieldData?.data?.centroid)
    }, [fetchEstimationsData])

    const [mapCenter, setMapCenter] = useState<Coordinates>(DEFAULT_CENTER)

    const {
        data: viewFieldData,
        isLoading,
        isError,
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

    const calculateBounds = useCallback((coordinates: Coordinates[]) => {
        const allPoints = [...coordinates];
        const lats = allPoints.map(p => p.lat);
        const lngs = allPoints.map(p => p.lng);

        return {
            north: Math.max(...lats),
            south: Math.min(...lats),
            east: Math.max(...lngs),
            west: Math.min(...lngs)
        };
    }, []);

    useEffect(() => {
        if (viewFieldData?.data?.field_boundary?.length > 0) {
            setMapCenter(viewFieldData?.data?.centroid);
            setCalculatedArea(viewFieldData?.data?.field_area);
            const bounds = calculateBounds(viewFieldData?.data?.field_boundary);
            const latDiff = bounds.north - bounds.south;
            const lngDiff = bounds.east - bounds.west;
            const maxDiff = Math.max(latDiff, lngDiff);
            let zoom = 13;
            if (maxDiff > 0.1) zoom = 10;
            else if (maxDiff > 0.05) zoom = 11;
            else if (maxDiff > 0.02) zoom = 12;
            else if (maxDiff > 0.01) zoom = 14;
            else zoom = 15;
        }
    }, [viewFieldData, calculateBounds]);

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

    const covertXYToLatLng = useCallback((homeLat: number, homeLon: number, x: number, y: number) => {
        const METERS_PER_DEGREE_LAT = 110540;
        const METERS_PER_DEGREE_LON = 111320;
        const dLat = y / METERS_PER_DEGREE_LAT;
        const dLon = x / (Math.cos(homeLat * Math.PI / 180) * METERS_PER_DEGREE_LON);
        const lat = homeLat + dLat;
        const lng = homeLon + dLon;
        return { lat, lng };
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

        fetchEstimationsData?.mission?.GoToField?.forEach((segment: Waypoint[]) => {
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

        fetchEstimationsData?.mission?.NavigateRows?.forEach((segment: Waypoint[]) => {
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

        const lastSegment = fetchEstimationsData?.mission?.GoToHome?.[fetchEstimationsData?.mission?.GoToHome?.length - 22];
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

    return (
        <div className="relative w-full h-screen">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader">Loading...</div>
                </div>
            )}
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={GOOGLE_MAPS_LIBRARIES}
            >
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={mapCenter}
                    zoom={DEFAULT_ZOOM}
                    mapTypeId="satellite"
                >
                    {viewFieldData?.data?.field_boundary?.length > 0 && (
                        <Polygon
                            path={viewFieldData?.data?.field_boundary}
                            options={polygonOptions}
                            onClick={handlePolygonClick}
                        />
                    )}
                    {shouldShowPaths && (
                        <div>
                            {pathForFeildAccessPoint?.length > 0 && (
                                <Polyline
                                    path={pathForFeildAccessPoint}
                                    options={homeToFieldOptions}
                                />
                            )}
                            {pathForRobotMove?.length > 0 && (
                                <Polyline
                                    path={pathForRobotMove}
                                    options={robotPathOptions}
                                />
                            )}
                            {pathForRobotHome?.length > 0 && (
                                <Polyline
                                    path={pathForRobotHome}
                                    options={robotPathToHomeOptions}
                                />
                            )}
                        </div>
                    )}

                    <Marker
                        position={viewFieldData?.data?.robot_home}
                        title="Robot Home"
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                    />
                    <Marker
                        position={viewFieldData?.data?.field_access_point}
                        title="Field Access Point"
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                    />

                    {showInfoWindow && (
                        <InfoWindow
                            position={viewFieldData?.data?.centroid}
                            onCloseClick={handlePolygonClick}
                        >
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-semibold text-lg mb-2">
                                    {viewFieldData?.data?.field_name || "Field Details"}
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Square size={14} className="text-green-600" />
                                        <span>Area: {calculatedArea} acres</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-red-500" />
                                        <span>Access Point Set</span>
                                    </div>
                                    {viewFieldData?.data?.location && (
                                        <div className="mt-2 text-xs text-gray-600">
                                            <strong>Location:</strong> {viewFieldData?.data?.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
            {location.pathname.includes('/config-mission') && <div><AddMissionForm viewFieldData={viewFieldData} /></div>}
            {location.pathname.includes('/config-robot') && <div><AddRobotForm viewFieldData={viewFieldData} setFetchEstimationsData={setFetchEstimationsData} setPathGeneratored={setPathGeneratored} robotType={robotType} setRobotType={setRobotType} /></div>}
        </div>
    );
};

export default ViewFieldPage;