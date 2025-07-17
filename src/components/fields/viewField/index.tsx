import AddRobotForm from "@/components/robots/configRobot";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";
import { useViewField } from "@/lib/hooks/useViewFieldData";
import { IViewFieldPageProps } from "@/lib/interfaces/maps";
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
    Polygon,
    Polyline,
} from "@react-google-maps/api";
import { useLocation } from "@tanstack/react-router";
import { MapPin, Square } from "lucide-react";
import { FC } from "react";
import AddMissionForm from "../../missions/configMission";
const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};
const DEFAULT_ZOOM = 17;
const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "places",
    "geocoding",
];

const ViewFieldPage: FC<IViewFieldPageProps> = () => {
    const location = useLocation();
    const {
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
    } = useViewField();

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
                            onCloseClick={handlePolygonClick}                        >
                            <div className="p-3 bg-white rounded-lg shadow-md min-w-[220px]">
                                <h3 className="font-bold text-gray-800 text-md mb-3 pb-2 border-b border-gray-200">
                                    {viewFieldData?.data?.field_name || "Field Details"}
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Square size={16} className="text-green-500" />
                                        <span className="text-sm font-medium">Area: <span className="font-semibold">{calculatedArea} acres</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span className="text-sm font-medium">Access Point: <span className="font-semibold">Set</span></span>
                                    </div>
                                    {viewFieldData?.data?.location && (
                                        <div className="pt-2 mt-2 text-sm border-t border-gray-100">
                                            <p className="font-medium text-gray-600">Location:</p>
                                            <p className="text-gray-500">{viewFieldData?.data?.location}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
            {location.pathname.includes('/config-mission') && (
                <AddMissionForm
                    viewFieldData={viewFieldData}
                />
            )}
            {location.pathname.includes('/config-robot') && (
                <AddRobotForm
                    viewFieldData={viewFieldData}
                    setFetchEstimationsData={setFetchEstimationsData}
                    setPathGeneratored={setPathGeneratored}
                    robotType={robotType}
                    setRobotType={setRobotType}
                />
            )}
        </div>
    );
};

export default ViewFieldPage;