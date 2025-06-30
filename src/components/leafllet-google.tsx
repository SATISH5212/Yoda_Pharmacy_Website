import { BASE_URL } from "@/config/appConfig";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import * as turf from "@turf/turf";
import { useState } from "react";
import { GOOGLE_MAP_API_KEY } from "@/config/appConfig";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 17.385,
  lng: 78.4867,
};


const LeafletGoogle = () => {
  const [polyCoordinates, setPolyCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [farmLocation, setFarmLocation] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handlePolygonComplete = async (overlay: any) => {
    const path = overlay
      .getPath()
      .getArray()
      .map((latLng: any) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

    setPolyCoordinates(path);

   

    const closed = [...path, path[0]];
    const turfPolygon = turf.polygon([
      closed.map((p) => [p.lng, p.lat]),
    ]);
    const areaSqMeters = turf.area(turfPolygon);
    const areaAcres = areaSqMeters / 4046.86;

    const centroid = turf.centroid(turfPolygon);
    const [lng, lat] = centroid.geometry.coordinates;

    setFarmLocation({
      center: { lat, lng },
      area: +areaAcres.toFixed(2),
    });
    

    //name,location, boundary
     const field_name="field_google"
     const location ="kakinda"
     const payload= {
        field_name:field_name,
        location : location,
        field_boundary : path
     }

      const res= await fetch(`${BASE_URL}/fieldmapping`,{
        method :"POST",
        headers : new Headers({
            'content-type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("access_token")}`
        }),
        body : JSON.stringify(payload)
    })  


    overlay.setMap(null); 

  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} libraries={["drawing"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={() => setMapLoaded(true)} // mark when script is ready
      >
        {polyCoordinates.length > 0 && (
          <Polygon
            path={polyCoordinates}
            options={{
              fillColor: "rgba(144, 222, 144, 0.5)",
              fillOpacity: 0.5,
              strokeColor: "#008000",
              strokeWeight: 2,
            }}
          />
        )}

        {/* Only render DrawingManager after Google Maps is loaded */}
        {mapLoaded && (
          <DrawingManager
            onPolygonComplete={handlePolygonComplete}
            onRectangleComplete={handlePolygonComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position:
                  window.google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.POLYGON,
                  window.google.maps.drawing.OverlayType.RECTANGLE,
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
  );
};

export default LeafletGoogle;
