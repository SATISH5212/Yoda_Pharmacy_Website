import {
    DrawingManager,
    GoogleMap,
    LoadScript,
    Marker,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";
import * as turf from "@turf/turf";
import { AlertCircle, MapPin, Trash2 } from "lucide-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { DrawToolsProps } from "@/types/dataTypes";
import { CordinatesToLocation } from "@/lib/helpers/latLongToLocation";
import { PolygonOptions } from "@/lib/interfaces/maps";
import { Coordinates } from "@/lib/interfaces/fields";
import { usePolygonCalculations } from "@/lib/hooks/useMapAreaAndLocation";
const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};
const DEFAULT_CENTER = { lat: 15.159614, lng: 79.85210 };
const DEFAULT_ZOOM = 16;
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
    } = props
    const [polygonPath, setPolygonPath] = useState<Coordinates[]>([]);
    const [accessPoint, setAccessPoint] = useState<Coordinates | undefined>();
    const [robotPoint, setRobotPoint] = useState<Coordinates | null>(null);
    const [googleInstance, setGoogleInstance] = useState<typeof window.google | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [mapCenter, setMapCenter] = useState<Coordinates>(DEFAULT_CENTER);
    const [searchMarker, setSearchMarker] = useState<Coordinates | null>(null);
    const [latInput, setLatInput] = useState("");
    const [lngInput, setLngInput] = useState("");
    const [searchedAddress, setSearchedAddress] = useState<string>("");
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const drawnShapeRef = useRef<google.maps.Polygon | google.maps.Rectangle | null>(null);

    const { calculateAreaAndLocation } = usePolygonCalculations();

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
            fillColor: "rgba(16, 204, 16, 0.5)",
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
                        { lat: ne.lat(), lng: sw.lng() },
                        { lat: ne.lat(), lng: ne.lng() },
                        { lat: sw.lat(), lng: ne.lng() },
                        { lat: sw.lat(), lng: sw.lng() },
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
            else if (mode === "robot_home") {
                setRobotPoint(point);
                setRobotHome(point);
                setMode("idle");
            }
        },
        [mode, setFieldAccessPoint, setMode, setRobotHome]
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
        setLatInput("");
        setLngInput("");
        setSearchedAddress("");
        setShowInfoWindow(false);

        if (drawnShapeRef.current) {
            drawnShapeRef.current.setMap(null);
            drawnShapeRef.current = null;
        }
    }, [setFormCoordinates, setFieldAccessPoint, setLocationInfo, setRobotHome]);

    const handleGoogleMapsLoad = useCallback(() => {
        setGoogleInstance(window.google);
    }, []);

    const handleSearch = async () => {
        const lat = parseFloat(latInput);
        const lng = parseFloat(lngInput);
        if (!isNaN(lat) && !isNaN(lng)) {
            const point = { lat, lng };
            setMapCenter(point);
            setSearchMarker(point);

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await res.json();
                setSearchedAddress(data.display_name || "Address not found");
            } catch {
                setSearchedAddress("Unable to fetch address");
            }
        }
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
                            label={{ text: "Field Access Point", color: "white", fontSize: "10px" }}
                        />
                    )}
                    {robotPoint && (
                        <Marker
                            position={robotPoint}
                            label={{ text: "Robot Point", color: "white", fontSize: "10px" }}
                        />
                    )}

                    {searchMarker && (
                        <Marker
                            position={searchMarker}
                            onMouseOver={() => setShowInfoWindow(true)}
                            onMouseOut={() => setShowInfoWindow(false)}
                        >
                            {showInfoWindow && (
                                <InfoWindow position={searchMarker}>
                                    <div className="text-sm max-w-[150px] bg-white rounded-md shadow-md  border-gray-200 text-gray-800 font-medium">
                                        {searchedAddress}
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    )}

                    {googleInstance && (
                        <div className="mr-20">

                            <DrawingManager
                                onPolygonComplete={handlePolygonComplete}
                                onRectangleComplete={handlePolygonComplete}
                                options={drawingManagerOptions}
                            />
                        </div>
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


            <div className="absolute  top-1 left-80 h-10 w-96 py-0.5 bg-white rounded shadow-lg flex gap-3 items-center border-gray-200">
                <input
                    type="number"
                    placeholder="Latitude"
                    value={latInput}
                    onChange={(e) => setLatInput(e.target.value)}
                    className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-2  text-sm w-28 outline-none transition"
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    value={lngInput}
                    onChange={(e) => setLngInput(e.target.value)}
                    className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-2 text-sm w-28 outline-none transition"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-0.5  text-sm rounded shadow"
                >                    Go
                </button>

            </div>
        </div>
    );
};

export default AddBoundaryMAP;


