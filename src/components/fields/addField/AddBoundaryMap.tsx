import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { DrawToolsProps } from "@/types/dataTypes";
import {
    DrawingManager,
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    Polygon,
} from "@react-google-maps/api";
import { Check, Edit, MoveLeft, Trash2, Undo, X } from "lucide-react";
import React from "react";
import { useAddField } from "@/lib/hooks/useAddField";
const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
}; const DEFAULT_ZOOM = 20;
const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "drawing",
    "places",
    "geocoding",
];

const AddBoundaryMAP: React.FC<DrawToolsProps> = (props) => {
    const {
        mapContainerStyle,
        mapCenter,
        defaultZoom,
        googleMapsApiKey,
        googleMapsLibraries,
        polygonPath,
        accessPoint,
        robotPoint,
        searchMarker,
        markerAddress,
        mapOptions,
        showDeleteButton,
        drawingManagerOptions,
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
    } = useAddField(props);

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
                {showDeleteButton && (
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
