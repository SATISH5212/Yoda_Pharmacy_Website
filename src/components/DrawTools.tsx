
import * as turf from "@turf/turf";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CircleMarker } from "react-leaflet";
import { DrawToolsProps } from "@/types/dataTypes";

// npm install react-leaflet@4 leaflet@1.9.4 leaflet-draw@1.0.4


const DrawTools = ({
  setFormCoordinates,
  setFieldAccessPoint,
  setRobotHome,
  mode,
  setMode,
  setLocationInfo

}: DrawToolsProps) => {
  const [polyCoordinates, setPolyCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [accessPoint, setAccessPoint] = useState<{ lat: number; lng: number }>();
  const [robotPoint, setRobotPoint] = useState<{ lat: number; lng: number }>();

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Reverse geocode error:", error);
      return null;
    }
  };


  const handleCreated = async (e: any) => {
    const { layerType, layer } = e;
    console.log("layerType:", layerType);

    // polygon 
    if (layerType === "polygon" || layerType === "rectangle") {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((latlng: any) => ({ lat: latlng.lat, lng: latlng.lng }));
      setFormCoordinates(coords);
      setPolyCoordinates(coords)
      console.log(coords)

      const boundary = [...coords, coords[0]];
      const polygon = turf.polygon([boundary.map((p) => [p.lng, p.lat])]); // turf expects lng and lat  for calculation but remaining lat ,lng are same format no need to change
      const areaSqMeters = turf.area(polygon);
      const areaAcres = areaSqMeters / 4046.86;

      const centroid = turf.centroid(polygon);
      const [lng, lat] = centroid.geometry.coordinates;
      const location = await reverseGeocode(lat, lng);

      setLocationInfo({
        location,
        area: areaAcres.toFixed(2)
      });

      console.log(coords)
    }

  };


  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (mode === "field_access_point") {
          const point = { lat, lng };
          setAccessPoint(point);
          setFieldAccessPoint(point);
          setMode("idle");
        } else if (mode === "robot_home") {
          const point = { lat, lng };
          setRobotPoint(point);
          setRobotHome(point);
          setMode("idle");
        }
      }
    });
    return null;
  };


  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={[17.385, 78.4867]}
        zoom={13}
        style={{height:"100%",width:"100%"}}
      >
      
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        <MapClickHandler />

        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={handleCreated}
            onDeleted={() => {
              setPolyCoordinates([]);
              setFormCoordinates([]);
              setAccessPoint(undefined);
              setRobotPoint(undefined);
              setFieldAccessPoint(null);
              setRobotHome(null);
              setLocationInfo(null)
            }}
            draw={{
              rectangle: true,
              circle: false,
              circlemarker: false,
              polygon: true,
              marker: false,
              polyline: false,
            }}
          />

          {/* it will draw complete polygon after completion of taking  Co-ordinates  */}
          {polyCoordinates.length > 0 && <Polygon positions={polyCoordinates}
            pathOptions={{ color: 'white', weight: 1, fillColor: 'rgba(144, 222, 144, 0.5)', fillOpacity: 0.5 }}
          />}


          {polyCoordinates.map((point, index) => (
            <CircleMarker
              key={index}
              center={[point.lat, point.lng]}
              radius={4}
              pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 1 }}
            />
          ))}


        </FeatureGroup>

        {/* markers at for field access points and robot home*/}
        {accessPoint && <Marker position={[accessPoint.lat, accessPoint.lng]}><Popup>Field Access Point</Popup></Marker>}
        {robotPoint && <Marker position={[robotPoint.lat, robotPoint.lng]}><Popup>Robot Home</Popup></Marker>}
      </MapContainer>
    </div>
  );
};

export default DrawTools;


