import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { usePolygonCalculations } from "@/lib/hooks/useMapAreaAndLocation";
import { Coordinates } from "@/lib/interfaces/fields";
import { PolygonOptions } from "@/lib/interfaces/maps";
import { DrawToolsProps } from "@/types/dataTypes";
import {
    DrawingManager,
    GoogleMap,
    LoadScript,
    Marker,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";
import { Trash2 } from "lucide-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};
const DEFAULT_CENTER = { lat: 15.159614, lng: 79.85210 };
const DEFAULT_ZOOM = 20;
const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "drawing",
    "places",
    "geocoding",
];

const AddBoundaryMAP: React.FC<DrawToolsProps> = (props) => {
    const {
        setFormCoordinates,
        setFieldAccessPoint,
        setRobotHome,
        setLocationInfo,
        mode,
        setMode,
    } = props;
    const [polygonPath, setPolygonPath] = useState<Coordinates[]>([]);
    const [accessPoint, setAccessPoint] = useState<Coordinates | undefined>();
    const [robotPoint, setRobotPoint] = useState<Coordinates | null>(null);
    const [googleInstance, setGoogleInstance] = useState<typeof window.google | null>(null);
    const [mapCenter, setMapCenter] = useState<Coordinates>(DEFAULT_CENTER);
    const [searchMarker, setSearchMarker] = useState<Coordinates | null>(null);
    const [markerAddress, setMarkerAddress] = useState<string>("");
    const drawnShapeRef = useRef<google.maps.Polygon | google.maps.Rectangle | null>(null);
    const [searchString, setSearchString] = useState("");

    const { calculateAreaAndLocation } = usePolygonCalculations();

    const polygonOptions: PolygonOptions = useMemo(() => ({
        fillColor: "#90ee90",
        strokeColor: "#006400",
        strokeWeight: 2,
        clickable: false,
        editable: false,
        draggable: false,
    }), []);

    const displayPolygonOptions = useMemo(() => ({
        fillColor: "rgba(16, 204, 16, 0.5)",
        fillOpacity: 0.5,
        strokeColor: "white",
        strokeWeight: 1,
    }), []);

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

        }
    }, [googleInstance, polygonOptions]);
    const extractPathFromOverlay = useCallback((overlay: google.maps.Polygon | google.maps.Rectangle): Coordinates[] => {
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
                    { lat: ne.lat(), lng: sw.lng() },
                    { lat: ne.lat(), lng: ne.lng() },
                    { lat: sw.lat(), lng: ne.lng() },
                    { lat: sw.lat(), lng: sw.lng() },
                ];
            }
        }
        return [];
    }, []);

    const handlePolygonComplete = useCallback(async (overlay: google.maps.Polygon | google.maps.Rectangle) => {
        try {
            const path = extractPathFromOverlay(overlay);
            if (path.length < 3) return;
            setPolygonPath(path);
            setFormCoordinates(path);
            drawnShapeRef.current = overlay;
            const locationInfo = await calculateAreaAndLocation(path);
            if (locationInfo) {
                setLocationInfo(locationInfo);
            } else {
                console.error("Failed to calculate location info");
                setLocationInfo({
                    location: "Calculation failed",
                    area: "0",
                    centroid: { lat: 0, lng: 0 },
                });
            }

            overlay.setMap(null);
        } catch (error) {
            console.error("Error in handlePolygonComplete:", error);
        }
    }, [extractPathFromOverlay, calculateAreaAndLocation, setFormCoordinates, setLocationInfo]);

    const fetchAddress = useCallback(async (point: Coordinates): Promise<string> => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${point.lat}&lon=${point.lng}`
            );
            const data = await res.json();
            return data.display_name || "Address not found";
        } catch {
            return "Unable to fetch address";
        }
    }, []);
    const handleLocationSearch = useCallback(async () => {
        if (!searchString) return;
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchString)}&limit=1`
            );
            const data = await res.json();
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                const point = { lat, lng };
                setMapCenter(point);
                setSearchMarker(point);
                const address = await fetchAddress(point);
                setMarkerAddress(address);
            } else {
                toast.info("No location found for search query.");
            }
        } catch (error) {
            console.error("Error during location search:", error);
        }
    }, [searchString, fetchAddress]);

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            const point: Coordinates = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            if (mode === "field_access_point") {
                setAccessPoint(point);
                setFieldAccessPoint(point);
                setMode("idle");
            } else if (mode === "robot_home") {
                setRobotPoint(point);
                setRobotHome(point);
                setMode("idle");
            } else if (mode === "idle") {
                setSearchMarker(point);
                const address = await fetchAddress(point);
                setMarkerAddress(address);
            }
        },
        [mode, setFieldAccessPoint, setMode, setRobotHome, fetchAddress]
    );

    const handleDelete = useCallback(() => {
        setPolygonPath([]);
        setFormCoordinates([]);
        setAccessPoint(undefined);
        setFieldAccessPoint(null);
        setRobotHome(null);
        setRobotPoint(null);
        setLocationInfo(null);
        setSearchMarker(null);
        setMarkerAddress("");

        if (drawnShapeRef.current) {
            drawnShapeRef.current.setMap(null);
            drawnShapeRef.current = null;
        }
    }, [setFormCoordinates, setFieldAccessPoint, setLocationInfo, setRobotHome]);

    const handleGoogleMapsLoad = useCallback(() => {
        setGoogleInstance(window.google);
    }, []);
    return (
        <div className="relative">
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={GOOGLE_MAPS_LIBRARIES}
                onLoad={handleGoogleMapsLoad}
            >
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={mapCenter}
                    zoom={DEFAULT_ZOOM}
                    onClick={handleMapClick}
                    mapTypeId="satellite"
                >
                    {polygonPath.length > 0 && (
                        <Polygon path={polygonPath} options={displayPolygonOptions} />
                    )}
                    {accessPoint && (
                        <Marker
                            position={accessPoint}
                            icon={{
                                path: window.google?.maps.SymbolPath.CIRCLE,
                                scale: 8,
                                fillColor: "#FFD700",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                            }}
                            label={{
                                text: "Field Access",
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {robotPoint && (
                        <Marker
                            position={robotPoint}
                            icon={{
                                path: window.google?.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                scale: 6,
                                fillColor: "#FF4500",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                            }}
                            label={{
                                text: "Robot Home",
                                color: "#FFFFFF",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {searchMarker && (
                        <Marker
                            position={searchMarker}
                            icon={{
                                path: window.google?.maps.SymbolPath.CIRCLE,
                                scale: 6,
                                fillColor: "#00BFFF",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                            }}
                        >
                            {markerAddress && (
                                <InfoWindow position={searchMarker}>
                                    <div className="max-w-xs text-md p-2">{markerAddress}</div>
                                </InfoWindow>
                            )}
                        </Marker>
                    )}
                    {googleInstance && (

                        <DrawingManager
                            onPolygonComplete={handlePolygonComplete}
                            onRectangleComplete={handlePolygonComplete}
                            options={drawingManagerOptions}
                        />

                    )}
                </GoogleMap>
            </LoadScript>

            <button
                onClick={handleDelete}
                className="absolute top-1.5 left-30 bg-white text-black rounded-[2px] shadow px-2 py-1 text-xs cursor-pointer hover:bg-gray-300"
                aria-label="Delete drawn shapes"
            >
                <Trash2 size={18} />
            </button>

            <div className="absolute top-4 left-1/3 transform -translate-x-1/2 w-[400px] p-2 bg-white rounded-sm shadow-lg flex items-center gap-3 border border-gray-200 w-36 h-10 -mt-2">
                <input
                    type="text"
                    placeholder="Search location"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md px-3 py-1 text-sm outline-none transition"
                />

                <button
                    onClick={handleLocationSearch}
                    className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-1 text-sm rounded-md shadow"
                >
                    Search
                </button>

            </div>

        </div>
    );
};

export default AddBoundaryMAP;