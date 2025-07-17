import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { CordinatesToLocation } from "@/lib/helpers/latLongToLocation";
import searchStringToLocation from "@/lib/helpers/locationSearch";
import { usePolygonCalculations } from "@/lib/hooks/useMapAreaAndLocation";
import { Coordinates } from "@/lib/interfaces/fields";
import { PolygonOptions } from "@/lib/interfaces/maps";
import { DrawToolsProps } from "@/types/dataTypes";
import {
    DrawingManager,
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import { Trash2, Check, X, MoveLeft, Edit, Undo } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
        fieldAccessPoint,
        robotHome,
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
    const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | undefined>(undefined);
    const [showdeleteButton, setShowDeleteButton] = useState<boolean>(true);
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
    const [polygonHistory, setPolygonHistory] = useState<Coordinates[][]>([]);
    const [isEditingBoundary, setIsEditingBoundary] = useState(false);
    const [originalPolygonPath, setOriginalPolygonPath] = useState<Coordinates[]>([]);
    const editablePolygonRef = useRef<google.maps.Polygon | null>(null);

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
        editable: isEditingBoundary,
        draggable: isEditingBoundary,
    }), [isEditingBoundary]);

    const drawingManagerOptions = useMemo(() => {
        if (!googleInstance) return {};
        return {
            drawingControl: !isEditingBoundary,
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
    }, [googleInstance, polygonOptions, isEditingBoundary]);

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

            toast.success("Now you can add Field access point and Robot home");
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
    }, [extractPathFromOverlay, calculateAreaAndLocation, setFormCoordinates, setLocationInfo, polygonPath]);

    const handleEditBoundary = useCallback(() => {
        if (polygonPath.length === 0) {
            toast.error("No boundary to edit. Please draw a boundary first.");
            return;
        }
        setPolygonHistory((prev) => [...prev, polygonPath]);
        setOriginalPolygonPath([...polygonPath]);
        setIsEditingBoundary(true);
        setShowDeleteButton(false);
        toast.info("Edit mode enabled. You can now modify the boundary by dragging the vertices.");
    }, [polygonPath]);

    const handlePolygonEdit = useCallback((polygon: google.maps.Polygon) => {
        setPolygonHistory((prevHistory) => [...prevHistory, polygonPath]);
        const path = polygon.getPath();
        const newPath = path.getArray().map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng(),
        }));

        setPolygonPath(newPath);
         }, [polygonPath]);

    const handleSaveEdit = useCallback(async () => {
        try {
            setFormCoordinates(polygonPath);
          
            const locationInfo = await calculateAreaAndLocation(polygonPath);
            if (locationInfo) {
                setLocationInfo(locationInfo);
            }
            setIsEditingBoundary(false);
            setOriginalPolygonPath([]);
            toast.success("Boundary updated successfully!");
        } catch (error) {
            console.error("Error saving edited boundary:", error);
            toast.error("Failed to save boundary changes.");
        }
    }, [polygonPath, calculateAreaAndLocation, setFormCoordinates, setLocationInfo]);
    const handleCancelEdit = useCallback(() => {
        setPolygonPath(originalPolygonPath);
        setIsEditingBoundary(false);
        setOriginalPolygonPath([]);
        toast.info("Edit cancelled. Boundary restored to original state.");
    }, [originalPolygonPath]);



    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng) return;
            if (isEditingBoundary) return;

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
                const address = await CordinatesToLocation(point.lat, point.lng);
                setMarkerAddress(address);
            }

        },
        [mode, setFieldAccessPoint, setMode, setRobotHome, isEditingBoundary]
    );

    const handleDelete = useCallback(() => {

        if (polygonPath.length === 0) {
            toast.error("No boundary to delete.");
        }
        setPolygonPath([]);
        setFormCoordinates([]);
        setAccessPoint(undefined);
        setFieldAccessPoint(null);
        setRobotHome(null);
        setRobotPoint(null);
        setLocationInfo(null);
        setSearchMarker(null);
        setMarkerAddress("");
        setPolygonHistory([]);

        if (drawnShapeRef.current) {
            drawnShapeRef.current.setMap(null);
            drawnShapeRef.current = null;
        }

    }, [setFormCoordinates, setFieldAccessPoint, setLocationInfo, setRobotHome, isEditingBoundary, polygonPath]);

    const handleUndo = useCallback(async () => {
        if (polygonHistory.length < 2) {
            toast.info("Nothing to undo");
            return;
        }

        const previousPath = polygonHistory[polygonHistory.length - 1];

        setPolygonHistory((prev) => prev.slice(0, -1));
        setPolygonPath(previousPath);
        setFormCoordinates(previousPath);

        if (previousPath.length > 0) {
            try {
                const locationInfo = await calculateAreaAndLocation(previousPath);
                if (locationInfo) {
                    setLocationInfo(locationInfo);
                }
            } catch (error) {
                console.error("Error calculating location info during undo:", error);
            }
        } else {
            setLocationInfo(null);
        }

        toast.success("Undo successful!");
    }, [polygonHistory, setFormCoordinates, calculateAreaAndLocation, setLocationInfo]);

    const handleGoogleMapsLoad = useCallback(() => {
        setGoogleInstance(window.google);
        const options = {
            disableDefaultUI: false,
            mapTypeControl: true,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: window.google.maps.ControlPosition.BOTTOM_LEFT,
            },
            mapTypeId: "satellite",
        }
        setMapOptions(options);
    }, []);

    const handleLocationSearch = (searchString: string) => {
        searchStringToLocation(searchString, setMapCenter, setSearchMarker, setMarkerAddress)
    }



    useEffect(() => {
        if (mode === "delete_access_point" && !fieldAccessPoint) {
            setAccessPoint(undefined);
            setMode("idle");
        }
        if (mode === "delete_robot_home" && !robotHome) {
            setRobotPoint(null);
            setMode("idle");
        }
    }, [mode]);


    const canUndo = polygonHistory.length > 1;

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
                    options={mapOptions}
                >
                    {polygonPath.length === 0 && !isEditingBoundary && (
                        <div className="absolute top-[55px] left-[55px] z-[9999] pointer-events-none animate-bounce-left">
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse"><MoveLeft className="text-white" /></span>
                                <span className="bg-white text-black text-[11px] px-3 py-[3px] rounded-md shadow-md font-medium border border-gray-300">
                                    Draw the boundary
                                </span>
                            </div>
                        </div>
                    )}

                    {polygonPath.length > 0 && (
                        <Polygon
                            path={polygonPath}
                            options={displayPolygonOptions}
                            onLoad={(polygon) => {
                                editablePolygonRef.current = polygon;
                            }}
                            onMouseUp={() => {
                                if (isEditingBoundary && editablePolygonRef.current) {
                                    handlePolygonEdit(editablePolygonRef.current);
                                }
                            }}
                            onDragEnd={() => {
                                if (isEditingBoundary && editablePolygonRef.current) {
                                    handlePolygonEdit(editablePolygonRef.current);
                                }
                            }}
                        />
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
                            onPolygonComplete={(overlay) => {
                                handlePolygonComplete(overlay);
                                drawingManagerRef.current?.setDrawingMode(null);
                            }}
                            onRectangleComplete={(overlay) => {
                                handlePolygonComplete(overlay);
                                drawingManagerRef.current?.setDrawingMode(null);
                            }}
                            options={drawingManagerOptions}
                            onLoad={(drawingManager) => {
                                drawingManagerRef.current = drawingManager;
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            <div className="absolute top-2 left-2 flex flex-col gap-2">
                {showdeleteButton && (
                    <button
                        onClick={handleDelete}
                        title="Delete drawn shapes"
                        className="absolute top-31 bg-white text-black rounded-md shadow px-2.5 py-2.5 text-xs cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Delete drawn shapes"
                        disabled={isEditingBoundary}
                    >
                        <Trash2 size={22} />
                    </button>
                )}
                {polygonPath.length > 0 && !isEditingBoundary && (
                    <button
                        onClick={handleEditBoundary}
                        title="Edit boundary"
                        className="absolute top-43 bg-white text-black rounded-md shadow px-2.5 py-2.5 text-xs cursor-pointer hover:bg-gray-300"
                        aria-label="Edit boundary"
                    >
                        <Edit size={22} />
                    </button>
                )}
                {isEditingBoundary && (
                    <button
                        onClick={handleUndo}
                        title={`Undo last change${canUndo ? ` (${polygonHistory.length - 1} actions available)` : ''}`}
                        className={`absolute top-125 rounded-md shadow px-2.5 py-2.5 text-xs cursor-pointer transition-colors ${canUndo
                            ? 'bg-white text-black hover:bg-gray-300'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        aria-label="Undo last polygon update"
                        disabled={!canUndo}
                    >
                        <Undo size={22} />
                    </button>
                )}

                {isEditingBoundary && (
                    <>
                        <button
                            onClick={() => {
                                handleSaveEdit()
                                setShowDeleteButton(true)
                            }}
                            title="Save changes"
                            className="bg-green-500 text-white rounded-md shadow px-2.5 py-2.5 text-xs cursor-pointer hover:bg-green-600"
                            aria-label="Save boundary changes"
                        >
                            <Check size={22} />
                        </button>
                        <button
                            onClick={() => {
                                handleCancelEdit()
                                setShowDeleteButton(true)
                            }}
                            title="Cancel edit"
                            className="bg-red-500 text-white rounded-md shadow px-2.5 py-2.5 text-xs cursor-pointer hover:bg-red-600"
                            aria-label="Cancel boundary edit"
                        >
                            <X size={22} />
                        </button>
                    </>
                )}
            </div>

            <div className="absolute top-2.5 left-65 transform -translate-x-1/2 w-[350px] px-1 bg-white rounded-sm shadow-lg flex items-center gap-3 border border-gray-200 h-9 -mt-2">
                <input
                    type="text"
                    placeholder="Search location"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md px-3 py-1 text-sm outline-none transition"
                />
                <button
                    onClick={() => handleLocationSearch(searchString)}
                    className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-1 text-sm rounded-md shadow"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default AddBoundaryMAP;
