import { jsxs, jsx } from 'react/jsx-runtime';
import * as turf from '@turf/turf';
import axios from 'axios';
import { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { r as reactLeafletDrawExports } from './react-leaflet-draw.mjs';
import 'leaflet-draw';
import 'leaflet';

const Map = () => {
  const [polyCoordinates, setPolyCoordinates] = useState([]);
  const [farmLocation, setFarmLocation] = useState(null);
  const [fieldAccessPoint, setFieldAccessPoint] = useState(null);
  const [robotHome, setRobotHome] = useState(null);
  const [polygonDrawn, setPolygonDrawn] = useState(false);
  const field_name = "field_1";
  localStorage.getItem("access_token");
  const reverseGeocode = async (lat, lng) => {
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
  const handleCreated = async (e) => {
    const { layerType, layer } = e;
    console.log("layerType:", layerType);
    if (layerType === "polygon" || layerType === "rectangle") {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((latlng) => ({ lat: latlng.lat, lng: latlng.lng }));
      setPolyCoordinates(coords);
      setPolygonDrawn(true);
      const boundary = [...coords, coords[0]];
      const polygon = turf.polygon([boundary.map((p) => [p.lat, p.lng])]);
      const areaSqMeters = turf.area(polygon);
      const areaAcres = areaSqMeters / 4046.86;
      const centroid = turf.centroid(polygon);
      const [lat, lng] = centroid.geometry.coordinates;
      const locationName = await reverseGeocode(lat, lng);
      setFarmLocation({
        locationName,
        center: [lat, lng],
        area: +areaAcres.toFixed(2)
      });
      return;
    }
    if (layerType === "marker") {
      if (!polygonDrawn) {
        alert("Please draw the field boundary first.");
        return;
      }
      const { lat, lng } = layer.getLatLng();
      const markerPoint = { lat, lng };
      if (!fieldAccessPoint) {
        console.log("Setting Field Access Point:", markerPoint);
        setFieldAccessPoint(markerPoint);
        return;
      }
      if (!robotHome) {
        console.log("Setting Robot Home:", markerPoint);
        const updatedFieldAccess = fieldAccessPoint;
        const updatedRobotHome = markerPoint;
        setRobotHome(markerPoint);
        if (updatedFieldAccess && updatedRobotHome && polyCoordinates.length > 0 && farmLocation) {
          const field_data = {
            field_name,
            location: farmLocation.locationName,
            robot_home: updatedRobotHome,
            field_access_point: updatedFieldAccess,
            field_boundary: polyCoordinates
          };
          console.log("Sending field data:", field_data);
          setFieldAccessPoint(null);
          setRobotHome(null);
          setPolygonDrawn(false);
          setPolyCoordinates([]);
          setFarmLocation(null);
        }
        return;
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs(MapContainer, { center: [17.385, 78.4867], zoom: 13, style: { height: "550px", width: "100%" }, children: [
    /* @__PURE__ */ jsx(TileLayer, { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" }),
    /* @__PURE__ */ jsxs(FeatureGroup, { children: [
      /* @__PURE__ */ jsx(
        reactLeafletDrawExports.EditControl,
        {
          position: "topleft",
          onCreated: handleCreated,
          draw: {
            rectangle: true,
            circle: false,
            circlemarker: false,
            polygon: true,
            marker: true,
            polyline: false
          }
        }
      ),
      polyCoordinates.length > 0 && /* @__PURE__ */ jsx(Polygon, { positions: polyCoordinates })
    ] })
  ] }) });
};
const SplitComponent = function Teleop() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-white", children: "Teleop" }),
    /* @__PURE__ */ jsx(Map, {})
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=teleop-CJtRcbbG.mjs.map
