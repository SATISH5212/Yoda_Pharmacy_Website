import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { CordinatesToLocation } from "@/lib/helpers/latLongToLocation";
import searchStringToLocation from "@/lib/helpers/locationSearch";
import { usePolygonCalculations } from "@/lib/hooks/useMapAreaAndLocation";
import { Coordinates } from "@/lib/interfaces/fields";
import { PolygonOptions } from "@/lib/interfaces/maps";
import { DrawToolsProps } from "@/types/dataTypes";

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

interface UseBoundaryMapReturn {
    mapContainerStyle: { width: string; height: string };
    mapCenter: Coordinates;
    defaultZoom: number;
    googleMapsApiKey: string;
    googleMapsLibraries: ("drawing" | "places" | "geocoding")[];
    polygonPath: Coordinates[];
    accessPoint: Coordinates | undefined;
    robotPoint: Coordinates | null;
    searchMarker: Coordinates | null;
    markerAddress: string;
    mapOptions: google.maps.MapOptions | undefined;
    showDeleteButton: boolean;
    drawingManagerOptions: google.maps.drawing.DrawingManagerOptions;
    polygonOptions: PolygonOptions;
    displayPolygonOptions: google.maps.PolygonOptions;
    searchString: string;
    isEditingBoundary: boolean;
    canUndo: boolean;
    handleGoogleMapsLoad: () => void;
    handleMapClick: (event: google.maps.MapMouseEvent) => Promise<void>;
    handlePolygonComplete: (overlay: google.maps.Polygon | google.maps.Rectangle) => Promise<void>;
    handleDelete: () => void;
    handleEditBoundary: () => void;
    handleSaveEdit: () => Promise<void>;
    handleCancelEdit: () => void;
    handleUndo: () => Promise<void>;
    handleLocationSearch: (search: string) => void;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
    drawnShapeRef: React.MutableRefObject<google.maps.Polygon | google.maps.Rectangle | null>;
    drawingManagerRef: React.MutableRefObject<google.maps.drawing.DrawingManager | null>;
    editablePolygonRef: React.MutableRefObject<google.maps.Polygon | null>;
    polygonHistory: Coordinates[][];
    setShowDeleteButton: React.Dispatch<React.SetStateAction<boolean>>;
    handlePolygonEdit: any
    googleInstance: typeof window.google | null
}

export const useAddField = (props: DrawToolsProps): UseBoundaryMapReturn => {
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
    const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | undefined>(undefined);
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(true);
    const [polygonHistory, setPolygonHistory] = useState<Coordinates[][]>([]);
    const [isEditingBoundary, setIsEditingBoundary] = useState(false);
    const [originalPolygonPath, setOriginalPolygonPath] = useState<Coordinates[]>([]);

    const drawnShapeRef = useRef<google.maps.Polygon | google.maps.Rectangle | null>(null);
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
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
        };
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
    }, [extractPathFromOverlay, calculateAreaAndLocation, setFormCoordinates, setLocationInfo]);

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
            setShowDeleteButton(true);
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
        setShowDeleteButton(true);
        toast.info("Edit cancelled. Boundary restored to original state.");
    }, [originalPolygonPath]);

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!event.latLng || isEditingBoundary) return;

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
            return;
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
    }, [setFormCoordinates, setFieldAccessPoint, setLocationInfo, setRobotHome, polygonPath]);

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
        };
        setMapOptions(options);
    }, []);

    const handleLocationSearch = useCallback(
        (searchString: string) => {
            searchStringToLocation(searchString, setMapCenter, setSearchMarker, setMarkerAddress);
        },
        [setMapCenter, setSearchMarker, setMarkerAddress]
    );

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if (mode === "delete_access_point" && !fieldAccessPoint) {
            setAccessPoint(undefined);
            setMode("idle");
        }
        if (mode === "delete_robot_home" && !robotHome) {
            setRobotPoint(null);
            setMode("idle");
        }
    }, [mode, fieldAccessPoint, robotHome, setMode]);

    const canUndo = polygonHistory.length > 1;

    return {
        mapContainerStyle: MAP_CONTAINER_STYLE,
        mapCenter,
        defaultZoom: DEFAULT_ZOOM,
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        googleMapsLibraries: GOOGLE_MAPS_LIBRARIES,
        polygonPath,
        accessPoint,
        robotPoint,
        searchMarker,
        markerAddress,
        mapOptions,
        showDeleteButton,
        drawingManagerOptions,
        polygonOptions,
        displayPolygonOptions,
        searchString,
        isEditingBoundary,
        canUndo,
        handleGoogleMapsLoad,
        handleMapClick,
        handlePolygonComplete,
        handleDelete,
        handleEditBoundary,
        handleSaveEdit,
        handleCancelEdit,
        handleUndo,
        handleLocationSearch,
        setSearchString,
        drawnShapeRef,
        drawingManagerRef,
        editablePolygonRef,
        polygonHistory,
        setShowDeleteButton,
        handlePolygonEdit,
        googleInstance,
    };
};