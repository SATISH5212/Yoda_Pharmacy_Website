import React, { useState, useRef, useCallback, useMemo } from "react";
import {
    GoogleMap,
    LoadScript,
    DrawingManager,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import * as turf from "@turf/turf";
import axios from "axios";
import { Trash2, MapPin, AlertCircle } from "lucide-react";

import { DrawToolsProps } from "@/types/dataTypes";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};
const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 };
const DEFAULT_ZOOM = 13;
const ACRES_CONVERSION_FACTOR = 4046.86;

const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "drawing",
    "places",
    "geocoding",
];

interface Coordinates {
    lat: number;
    lng: number;
}

interface PolygonOptions {
    fillColor: string;
    strokeColor: string;
    strokeWeight: number;
    clickable: boolean;
    editable: boolean;
    draggable: boolean;
}

const usePolygonCalculations = () => {
    const [geocodingStatus, setGeocodingStatus] = useState<string>("");
    const reverseGeocodeGoogle = async (lat: number, lng: number): Promise<string> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'YourAppName/1.0 (your-email@example.com)'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.display_name || "Address not found";
        } catch (error) {
            console.error("Nominatim geocoding error:", error);
            return "Unable to fetch address";
        }
    };

    const calculateAreaAndLocation = useCallback(
        async (path: Coordinates[]) => {
            if (path.length < 3) {
                console.log("Path has less than 3 points, cannot calculate area");
                return null;
            }
            try {
                setGeocodingStatus("Calculating area and location...");
                const coordinates: [number, number][] = [
                    ...path.map((p) => [p.lng, p.lat] as [number, number]),
                    [path[0].lng, path[0].lat],
                ];

                const turfPoly = turf.polygon([coordinates]);
                const areaInSquareMeters = turf.area(turfPoly);
                const areaInAcres = areaInSquareMeters / ACRES_CONVERSION_FACTOR;
                const centroid = turf.centroid(turfPoly);
                const [lngC, latC] = centroid.geometry.coordinates;

                const location = await reverseGeocodeGoogle(latC, lngC);
                const result = {
                    location,
                    area: areaInAcres.toFixed(2),
                    centroid: { lat: latC, lng: lngC },
                    areaInSquareMeters: areaInSquareMeters.toFixed(2)
                };
                setGeocodingStatus("");
                return result;
            } catch (error) {
                setGeocodingStatus("Error calculating area and location");
            }
        },
        []
    );

    return { calculateAreaAndLocation, geocodingStatus };
};

const DrawTools: React.FC<DrawToolsProps> = ({
    setFormCoordinates,
    setFieldAccessPoint,
    setLocationInfo,
    mode,
    setMode,
}) => {
    const [polygonPath, setPolygonPath] = useState<Coordinates[]>([]);
    const [accessPoint, setAccessPoint] = useState<Coordinates | undefined>();
    const [googleInstance, setGoogleInstance] = useState<typeof window.google | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const drawnShapeRef = useRef<google.maps.Polygon | google.maps.Rectangle | null>(null);

    const { calculateAreaAndLocation, geocodingStatus } = usePolygonCalculations();

    const polygonOptions: PolygonOptions = useMemo(
        () => ({
            fillColor: "#90ee90",
            strokeColor: "#006400",
            strokeWeight: 2,
            clickable: false,
            editable: false,
            draggable: false,
        }),
        []
    );

    const displayPolygonOptions = useMemo(
        () => ({
            fillColor: "rgba(144, 222, 144, 0.5)",
            fillOpacity: 0.5,
            strokeColor: "white",
            strokeWeight: 1,
        }),
        []
    );

    const drawingManagerOptions = useMemo(() => {
        if (!googleInstance) return {};

        return {
            drawingControl: true,
            drawingControlOptions: {
                position: googleInstance.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    googleInstance.maps.drawing.OverlayType.POLYGON,
                    googleInstance.maps.drawing.OverlayType.RECTANGLE,
                ],
            },
            polygonOptions,
            rectangleOptions: polygonOptions,
        };
    }, [googleInstance, polygonOptions]);

    const extractPathFromOverlay = useCallback(
        (overlay: google.maps.Polygon | google.maps.Rectangle): Coordinates[] => {
            if (overlay instanceof google.maps.Polygon) {
                const pathArray = overlay.getPath().getArray();
                return pathArray.map((latLng) => ({
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                }));
            } else if (overlay instanceof google.maps.Rectangle) {
                const bounds = overlay.getBounds();
                if (bounds) {
                    const ne = bounds.getNorthEast();
                    const sw = bounds.getSouthWest();
                    return [
                        { lat: ne.lat(), lng: sw.lng() }, // NW
                        { lat: ne.lat(), lng: ne.lng() }, // NE
                        { lat: sw.lat(), lng: ne.lng() }, // SE
                        { lat: sw.lat(), lng: sw.lng() }, // SW
                    ];
                }
            }
            return [];
        },
        []
    );

    const handlePolygonComplete = useCallback(
        async (overlay: google.maps.Polygon | google.maps.Rectangle) => {
            try {
                setIsCalculating(true);
                const path = extractPathFromOverlay(overlay);

                console.log("Extracted path:", path);

                if (path.length < 3) {
                    console.warn("Invalid path: less than 3 points");
                    return;
                }

                setPolygonPath(path);
                setFormCoordinates(path);
                drawnShapeRef.current = overlay;

                const locationInfo = await calculateAreaAndLocation(path);
                console.log("Location info result:", locationInfo);

                if (locationInfo) {
                    setLocationInfo(locationInfo);
                } else {
                    console.error("Failed to calculate location info");
                    setLocationInfo({
                        location: "Calculation failed",
                        area: "0"
                    });
                }

                overlay.setMap(null);
            } catch (error) {
                console.error("Error in handlePolygonComplete:", error);
            } finally {
                setIsCalculating(false);
            }
        },
        [extractPathFromOverlay, calculateAreaAndLocation, setFormCoordinates, setLocationInfo]
    );

    const handleMapClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;

            const point: Coordinates = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            if (mode === "field_access_point") {
                setAccessPoint(point);
                setFieldAccessPoint(point);
                setMode("idle");
            }
        },
        [mode, setFieldAccessPoint, setMode]
    );

    const handleDelete = useCallback(() => {
        setPolygonPath([]);
        setFormCoordinates([]);
        setAccessPoint(undefined);
        setFieldAccessPoint(null);
        setLocationInfo(null);

        if (drawnShapeRef.current) {
            drawnShapeRef.current.setMap(null);
            drawnShapeRef.current = null;
        }
    }, [setFormCoordinates, setFieldAccessPoint, setLocationInfo]);

    const handleGoogleMapsLoad = useCallback(() => {
        setGoogleInstance(window.google);
        console.log("Google Maps loaded successfully");
    }, []);

    const renderPolygon = () => {
        if (polygonPath.length === 0) return null;

        return (
            <Polygon
                path={polygonPath}
                options={displayPolygonOptions}
            />
        );
    };

    const renderMarkers = () => {
        if (!accessPoint) return null;

        return (
            <Marker
                position={accessPoint}
                label={{
                    text: "Field Access Point",
                    color: "white",
                    fontSize: "10px",
                }}
            />
        );
    };

    const renderDrawingManager = () => {
        if (!googleInstance) return null;

        return (
            <DrawingManager
                onPolygonComplete={handlePolygonComplete}
                onRectangleComplete={handlePolygonComplete}
                options={drawingManagerOptions}
            />
        );
    };

    return (
        <div className="relative">
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={GOOGLE_MAPS_LIBRARIES}
                onLoad={handleGoogleMapsLoad}
            >
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                    onClick={handleMapClick}
                    mapTypeId="satellite"
                >
                    {renderPolygon()}
                    {renderMarkers()}
                    {renderDrawingManager()}
                </GoogleMap>
            </LoadScript>
            <button
                onClick={handleDelete}
                className="absolute top-1.5 left-23 bg-white text-black rounded-[2px] shadow px-2 py-1 text-xs cursor-pointer hover:bg-gray-300"
                aria-label="Delete drawn shapes"
            >
                <Trash2 size={18} />
            </button>
            {(isCalculating || geocodingStatus) && (
                <div className="absolute top-16 left-4 bg-white rounded-md shadow-lg p-3 max-w-xs">
                    <div className="flex items-center space-x-2">
                        {isCalculating ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span className="text-sm text-gray-700">Calculating...</span>
                            </>
                        ) : geocodingStatus.includes("error") || geocodingStatus.includes("failed") ? (
                            <>
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm text-gray-700">{geocodingStatus}</span>
                            </>
                        ) : (
                            <>
                                <MapPin className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-gray-700">{geocodingStatus}</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrawTools;