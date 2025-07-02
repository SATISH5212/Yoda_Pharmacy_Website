import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import * as turf from "@turf/turf";
import { MapPin, Square } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { useQuery } from "@tanstack/react-query";
import {
    useParams
} from "@tanstack/react-router";
import { getSingleFieldAPI } from "@/lib/services/fields";
const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};

const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 };
const DEFAULT_ZOOM = 13;
const ACRES_CONVERSION_FACTOR = 4046.86;

const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "places",
    "geocoding",
];

interface Coordinates {
    lat: number;
    lng: number;
}

interface FieldData {
    field_access_point: Coordinates;
    field_boundary: Coordinates[];
    field_name?: string;
    field_area?: string;
    location?: string;
}

export interface IViewFieldPageProps {
    fieldData?: FieldData;
}

const ViewFieldPage: FC<IViewFieldPageProps> = ({ fieldData }) => {
    const { field_id } = useParams({ strict: false });
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [calculatedArea, setCalculatedArea] = useState<string>("");
    const [mapCenter, setMapCenter] = useState<Coordinates>(DEFAULT_CENTER);
    const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
    const {
        data: viewFieldData,
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

    const calculateArea = useCallback((coordinates: Coordinates[]) => {
        if (coordinates.length < 3) return "0.00";

        try {
            const turfCoordinates: [number, number][] = [
                ...coordinates.map((p) => [p.lng, p.lat] as [number, number]),
                [coordinates[0].lng, coordinates[0].lat],
            ];

            const turfPoly = turf.polygon([turfCoordinates]);
            const areaInSquareMeters = turf.area(turfPoly);
            const areaInAcres = areaInSquareMeters / ACRES_CONVERSION_FACTOR;

            return areaInAcres.toFixed(2);
        } catch (error) {
            console.error("Error calculating area:", error);
            return "0.00";
        }
    }, []);
    const getPolygonCenter = useCallback((coordinates: Coordinates[]) => {
        if (coordinates.length === 0) return DEFAULT_CENTER;

        try {
            const turfCoordinates: [number, number][] = [
                ...coordinates.map((p) => [p.lng, p.lat] as [number, number]),
                [coordinates[0].lng, coordinates[0].lat],
            ];

            const turfPoly = turf.polygon([turfCoordinates]);
            const centroid = turf.centroid(turfPoly);
            const [lng, lat] = centroid.geometry.coordinates;

            return { lat, lng };
        } catch (error) {
            console.error("Error calculating center:", error);
            return DEFAULT_CENTER;
        }
    }, []);

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
        if (viewFieldData?.data?.field_boundary.length > 0) {
            const center = getPolygonCenter(viewFieldData?.data?.field_boundary);
            setMapCenter(center);
            const area = calculateArea(viewFieldData?.data?.field_boundary);
            setCalculatedArea(area);
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

            setMapZoom(zoom);
        }
    }, [viewFieldData, getPolygonCenter, calculateArea, calculateBounds]);

    const polygonOptions = useMemo(() => ({
        fillColor: "rgba(144, 238, 144, 0.4)",
        fillOpacity: 0.4,
        strokeColor: "#228B22",
        strokeWeight: 2,
        clickable: true,
        editable: false,
        draggable: false,
    }), []);
    const handlePolygonClick = useCallback(() => {
        setShowInfoWindow(true);
    }, []);

    const handleInfoWindowClose = useCallback(() => {
        setShowInfoWindow(false);
    }, []);

    return (
        <div className="relative w-full h-screen">
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={GOOGLE_MAPS_LIBRARIES}
            >
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={mapCenter}
                    zoom={mapZoom}
                    mapTypeId="satellite"
                    options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: true
                    }}
                >
                    {viewFieldData?.data?.field_boundary.length > 0 && (
                        <Polygon
                            path={viewFieldData?.data?.field_boundary}
                            options={polygonOptions}
                            onClick={handlePolygonClick}
                        />
                    )}


                    <Marker
                        position={viewFieldData?.data?.field_access_point}
                        title="Field Access Point"
                        icon={{
                            path: window.google?.maps.SymbolPath.CIRCLE,
                            fillColor: "#FF4444",
                            fillOpacity: 1,
                            strokeColor: "#FFFFFF",
                            strokeWeight: 2,
                            scale: 8,
                        }}
                    />

                    {showInfoWindow && (
                        <InfoWindow
                            position={getPolygonCenter(viewFieldData?.data?.field_boundary)}
                            onCloseClick={handleInfoWindowClose}
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

            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                <h2 className="font-bold text-lg mb-3 text-gray-800">
                    {viewFieldData?.data?.field_name || "Field Information"}
                </h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Field Area:</span>
                        <span className="font-semibold text-green-600">
                            {calculatedArea} acres
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Boundary Points:</span>
                        <span className="font-semibold">
                            {viewFieldData?.data?.field_boundary.length}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Access Point:</span>
                        <span className="text-green-600">
                            <MapPin size={16} className="inline" />
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setShowInfoWindow(!showInfoWindow)}
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded transition-colors"
                >
                    {showInfoWindow ? "Hide Details" : "Show Details"}
                </button>
            </div>


            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <h3 className="font-semibold text-sm mb-2">Legend</h3>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-200 border-2 border-green-600 rounded"></div>
                        <span>Field Boundary</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                        <span>Access Point</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFieldPage;