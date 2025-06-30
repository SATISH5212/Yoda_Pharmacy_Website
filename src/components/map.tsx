import * as turf from "@turf/turf";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";


const Map = () => {
 
  
  const [polyCoordinates, setPolyCoordinates] = useState<{ lat: number; lng: number }[]>([]);
  const [farmLocation, setFarmLocation] = useState<any>(null);


  // const reverseGeocode = async (lat: number, lng: number) => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  //     );
  //     return response.data.display_name;
  //   } catch (error) {
  //     console.error("Reverse geocode error:", error);
  //     return null;
  //   }
  // };


const handleCreated = async (e: any) => {
  const { layerType, layer } = e;
  console.log("layerType:", layerType);
  
  // polygon 
  if (layerType === "polygon" || layerType === "rectangle") {
    const latlngs = layer.getLatLngs()[0];
    const coords = latlngs.map((latlng: any) => ({ lat: latlng.lat, lng: latlng.lng }));
    setPolyCoordinates(coords);

    const boundary = [...coords, coords[0]];
    const polygon = turf.polygon([boundary.map((p) => [p.lat, p.lng])]);
    const areaSqMeters = turf.area(polygon);
    const areaAcres = areaSqMeters / 4046.86;

    const centroid = turf.centroid(polygon);
    const [lat, lng] = centroid.geometry.coordinates;
    // const locationName = await reverseGeocode(lat, lng);

  }
 
  }

  return (
    <div className="min-w-full h-screen">
      <MapContainer center={[17.385, 78.4867]} zoom={13} className="w-full h-screen">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={handleCreated}
            draw={{
              rectangle: true,
              circle: false,
              circlemarker: false,
              polygon: true,
              marker: true,
              polyline: false,
            }}
          />
          {polyCoordinates.length > 0 && <Polygon positions={polyCoordinates} />}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default Map;


































    // const handleCreated = async (e: any) => {
    //     const { layerType, layer } = e;


    //     if (layerType === "polygon" || layerType === "rectangle") {
    //         const latlngs = layer.getLatLngs()[0];

    //         const coords = latlngs.map((latlng: any) => (
    //             { lat: latlng.lat, lng: latlng.lng }
    //         ));

    //         console.log(coords);

    //         setPolyCoordinates(coords);

    //         const boundary = [...coords, coords[0]];




    //         // calculte area 
    //         const polygon = turf.polygon([
    //             boundary.map((point) => [point.lat, point.lng])
    //         ]);

    //         const areaSqMeters = turf.area(polygon);
    //         const areaAcres = areaSqMeters / 4046.86;

    //         const centroid = turf.centroid(polygon);
    //         const [lat, lng] = centroid.geometry.coordinates;

    //         const locationName = await reverseGeocode(lat, lng);

    //         setFarmLocation({
    //             locationName,
    //             center: [lat, lng],
    //             area: +areaAcres.toFixed(2),
    //         });

    //         if (layerType === "marker") {

    //             const { lat, lng } = layer.getLatLng();
    //             const field_access = { lat, lng } 
    //             console.log(field_access);
    //             console.log("robot start point reached");

    //             const field_data = { field_name: field_name, location: locationName, robot_home: robot_home, field_access_point: field_access_point, field_boundary: coords }
    //             console.log("field data ", field_data)


    //             fetch_field_data(field_data)

    //         }

    //     }

    // };