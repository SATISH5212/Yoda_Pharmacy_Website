import {
    GoogleMap,
    LoadScript,
    DrawingManager,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import * as turf from "@turf/turf";
import axios from "axios";
import { useState, useRef } from "react";
import { DrawToolsProps } from "@/types/dataTypes";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { Trash2, Circle } from "lucide-react";


const containerStyle = {
    width: "100%",
    height: "100vh",
};

const center = { lat: 17.385, lng: 78.4867 };

const DrawTools = ({
    setFormCoordinates,
    setFieldAccessPoint,
    // setRobotHome,
    setLocationInfo,
    mode,
    setMode,
}: DrawToolsProps) => {
    const [polygonPath, setPolygonPath] = useState<{ lat: number; lng: number }[]>([]);
    const [accessPoint, setAccessPoint] = useState<{ lat: number; lng: number }>();
    // const [robotPoint, setRobotPoint] = useState<{ lat: number; lng: number }>();
    const [googleInstance, setGoogleInstance] = useState<typeof window.google | null>(null);

    const drawnShapeRef = useRef<google.maps.Polygon | google.maps.Rectangle | null>(null);

    const handlePolygonComplete = async (
        overlay: google.maps.Polygon | google.maps.Rectangle
    ) => {

        let path: { lat: number; lng: number }[] = [];

        if (overlay instanceof google.maps.Polygon) {
            const pathArray = overlay.getPath().getArray();
            if (pathArray.length < 3) return;

            path = pathArray.map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
            }));
        }

        setPolygonPath(path);
        setFormCoordinates(path);
        drawnShapeRef.current = overlay;



        const coordinates: [number, number][] = [
            ...path.map((p) => [p.lng, p.lat] as [number, number]),
            [path[0].lng, path[0].lat],
        ];
        if (coordinates.length < 4) return;

        const turfPoly = turf.polygon([coordinates]);
        const area = turf.area(turfPoly) / 4046.86;
        const [lngC, latC] = turf.centroid(turfPoly).geometry.coordinates;

        const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latC},${lngC}&key=${GOOGLE_MAP_API_KEY}`
        );

        setLocationInfo({
            location: res.data.results?.[0]?.formatted_address || "Unknown",
            area: area.toFixed(2),
        });

        overlay.setMap(null);
    };


    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (!e.latLng)
            return;

        const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };

        if (mode === "field_access_point") {
            setAccessPoint(point);
            setFieldAccessPoint(point);
            setMode("idle");
            // } else if (mode === "robot_home") {
            //     setRobotPoint(point);
            //     setRobotHome(point);
            //     setMode("idle");
            // }
        };
    }


    const handleDelete = () => {
        setPolygonPath([]);
        setFormCoordinates([]);
        setAccessPoint(undefined);
        // setRobotPoint(undefined);
        setFieldAccessPoint(null);
        // setRobotHome(null);
        setLocationInfo(null);

        if (drawnShapeRef.current) {
            drawnShapeRef.current.setMap(null);
            drawnShapeRef.current = null;
        }
    };

    return (
        <div className="relative ">
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={["drawing", "places", "geocoding"]}
                onLoad={() => setGoogleInstance(window.google)}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onClick={handleMapClick}
                    mapTypeId="satellite"
                >
                    {polygonPath.length > 0 && (
                        <Polygon
                            path={polygonPath}
                            options={{
                                fillColor: "rgba(144, 222, 144, 0.5)",
                                fillOpacity: 0.5,
                                strokeColor: "white",
                                strokeWeight: 1,
                            }}
                        />
                    )}



                    {/* Markers */}
                    {accessPoint && <Marker position={accessPoint} label={{ text: "Field Access Point", color: "white", fontSize: "10px" }} />}
                    {/* {robotPoint && <Marker position={robotPoint} label={{text: "Robot Home", color: "white", fontSize:"10px"}} />} */}

                    {/* Drawing Tools */}
                    {googleInstance && (
                        <DrawingManager
                            onPolygonComplete={handlePolygonComplete}
                            onRectangleComplete={handlePolygonComplete}
                            options={{
                                drawingControl: true,
                                drawingControlOptions: {
                                    position: googleInstance.maps.ControlPosition.TOP_LEFT,
                                    drawingModes: [
                                        googleInstance.maps.drawing.OverlayType.POLYGON,
                                        googleInstance.maps.drawing.OverlayType.RECTANGLE,
                                    ],
                                },
                                polygonOptions: {
                                    fillColor: "#90ee90",
                                    strokeColor: "#006400",
                                    strokeWeight: 2,
                                    clickable: false,
                                    editable: false,
                                    draggable: false,
                                },
                                rectangleOptions: {
                                    fillColor: "#90ee90",
                                    strokeColor: "#006400",
                                    strokeWeight: 2,
                                    clickable: false,
                                    editable: false,
                                    draggable: false,
                                },
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            <button
                onClick={handleDelete}
                className="absolute top-1.5 left-23 bg-white text-black rounded-[2px] shadow px-2 py-1 text-xs cursor-pointer hover:bg-gray-300"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default DrawTools;
