
import {
    GoogleMap,
    LoadScript,
    OverlayView
} from "@react-google-maps/api";

import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";

export type Coordinates = {
    lat: number,
    lng: number
};

import { Marker, Polyline, } from '@react-google-maps/api';
import { useMemo } from 'react';
import samplePath from "../viewField/samplePath";
interface Waypoint {
    x: number;
    y: number;
    theta: number;
    velocity: number;
    omega: number;
}

const coordinates: {
    lat: number;
    lng: number;
    waypoint: Waypoint;
    distance: number;
    segment: number;
    index: number;       // index within that segment
    globalIndex: number; // index across all segments
}[] = [];
// // Sample mission data
// const samplePath = {
//     RobotHome: {
//         lng: 78.596490842522456,
//         lat: 17.469856405071194
//     },
//     RobotPath: [
//         { x: 4.8873588957100296, y: 1.0018709176273199, theta: 0.0014147992756170409, velocity: 0.1, omega: 0 },
//         { x: 4.9859037193297997, y: 1.0018709176273199, theta: 0.0014147992756170409, velocity: 0.1, omega: 0 },
//         { x: 5.0844485429495689, y: 1.0018709176273199, theta: 0.0014147992756170409, velocity: 0.1, omega: 0 },
//         { x: 5.1829933665693382, y: 1.0018709176273199, theta: 0.0014147992756170411, velocity: 0.1, omega: 0 },
//         { x: 5.2815381901891074, y: 1.0018709176273199, theta: 0.0014147992756170411, velocity: 0.1, omega: 0 }
//     ]
// };

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100vh",
};

const DEFAULT_ZOOM = 30;
const GOOGLE_MAPS_LIBRARIES: ("drawing" | "places" | "geocoding")[] = [
    "places",
    "geocoding",
];

// Function to convert meters to lat/lng offset
const metersToLatLng = (meters: number, isLatitude = false) => {
    const metersPerDegree = 111320;
    return meters / metersPerDegree;
};

const ViewFieldPathPage = () => {
    const pathCoordinates = useMemo(() => {
        const coordinates: any[] = [];
        const robotHome = samplePath.mission?.RobotHome;

        // Add robot home as first point
        coordinates.push({
            lat: robotHome.lat,
            lng: robotHome.lng,
            waypoint: { x: 0, y: 0 },
            distance: 0
        });


        // const R = 6378137;
        // function offsetToLatLng(lat0: number, lng0: number, x: number, y: number) {
        //     const dLat = y / R;
        //     const dLng = x / (R * Math.cos((Math.PI * lat0) / 180));

        //     const lat = lat0 + (dLat * 180) / Math.PI;
        //     const lng = lng0 + (dLng * 180) / Math.PI;

        //     return { lat, lng };
        // }
        //piysh formula
        function offsetToLatLng(homeLat: number, homeLon: number, x: number, y: number) {
            const METERS_PER_DEGREE_LAT = 110540; // approximate average value
            const METERS_PER_DEGREE_LON = 111320; // can be adjusted depending on latitude

            const dLat = y / METERS_PER_DEGREE_LAT;
            const dLon = x / (Math.cos(homeLat * Math.PI / 180) * METERS_PER_DEGREE_LON);

            const lat = homeLat + dLat;
            const lon = homeLon + dLon;

            return { lat, lng: lon };
        }

        // if single array of objects robot path
        // samplePath.mission?.RobotPath.forEach((waypoint, index) => {
        //     const { lat, lng } = offsetToLatLng(robotHome.lat, robotHome.lng, waypoint.x, waypoint.y);

        //     const distance = Math.sqrt(waypoint.x ** 2 + waypoint.y ** 2);
        //     console.log
        //     coordinates.push({
        //         lat,
        //         lng,
        //         waypoint,
        //         distance,
        //         index
        //     });
        // });

        // if robot path is 2D array
        samplePath.mission?.RobotPath.forEach((segment: Waypoint[], segmentIdx: number) => {
            segment.forEach((waypoint, waypointIdx) => {
                const { lat, lng } = offsetToLatLng(
                    robotHome.lat,
                    robotHome.lng,
                    waypoint.x,
                    waypoint.y
                );
                console.log(offsetToLatLng(17.469856405071194, 78.59649084252246, 4.536775917853563, -3.19812908237268), "mamam001")

                const distance = Math.hypot(waypoint.x, waypoint.y)
                coordinates.push({
                    lat,
                    lng,
                    waypoint,
                    distance,
                    segment: segmentIdx,
                    index: waypointIdx,
                    globalIndex: coordinates.length
                });
            });
        });

        return coordinates;
    }, []);
    const polylinePath = pathCoordinates.map(coord => ({
        lat: coord.lat,
        lng: coord.lng
    }));

    const mapCenter = {
        lat: samplePath.mission.RobotHome.lat,
        lng: samplePath.mission.RobotHome.lng
    };
    const polylineOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        geodesic: true,
    };
    const waypointMarkers = pathCoordinates.map((coord, index) => ({
        position: { lat: coord.lat, lng: coord.lng },
        label: index === 0 ? 'H' : index.toString(),
        title: index === 0 ? 'Robot Home' : `Waypoint ${index}: (${coord.waypoint.x.toFixed(3)}m, ${coord.waypoint.y.toFixed(3)}m) - Distance: ${coord.distance.toFixed(3)}m`
    }));

    return (
        <div className="relative w-full h-screen">
            <LoadScript
                googleMapsApiKey={GOOGLE_MAP_API_KEY}
                libraries={GOOGLE_MAPS_LIBRARIES}
            >
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={mapCenter}
                    zoom={DEFAULT_ZOOM}
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
                    {/* Draw the path */}
                    <Polyline
                        path={polylinePath}
                        options={polylineOptions}
                    />
                    <Marker
                        position={samplePath.mission.RobotHome}
                        title="Robot Home"
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                    />

                    {/* Add markers for each waypoint */}
                    {/* {waypointMarkers.map((marker, index) => (
                        // <Marker
                        //     key={index}
                        //     position={marker.position}
                        //     label={{
                        //         text: marker.label,
                        //         color: 'white',
                        //         fontWeight: 'bold',
                        //         fontSize: '12px'
                        //     }}
                        //     title={marker.title}
                        // />
                        <OverlayView
                            position={marker.position}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div
                                style={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    backgroundColor: "blue",
                                    transform: "translate(-50%, -50%)",
                                }}
                                title="Robot Home"
                            />
                        </OverlayView>
                    ))} */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default ViewFieldPathPage;