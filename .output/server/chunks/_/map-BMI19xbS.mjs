import { jsx, jsxs } from 'react/jsx-runtime';
import * as turf from '@turf/turf';
import { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';
import { r as reactLeafletDrawExports } from './react-leaflet-draw.mjs';

const Map = () => {
  const [polyCoordinates, setPolyCoordinates] = useState([]);
  const [farmLocation, setFarmLocation] = useState(null);
  const handleCreated = async (e) => {
    const { layerType, layer } = e;
    console.log("layerType:", layerType);
    if (layerType === "polygon" || layerType === "rectangle") {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((latlng) => ({ lat: latlng.lat, lng: latlng.lng }));
      setPolyCoordinates(coords);
      const boundary = [...coords, coords[0]];
      const polygon = turf.polygon([boundary.map((p) => [p.lat, p.lng])]);
      turf.area(polygon);
      const centroid = turf.centroid(polygon);
      const [lat, lng] = centroid.geometry.coordinates;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-w-full h-screen", children: /* @__PURE__ */ jsxs(MapContainer, { center: [17.385, 78.4867], zoom: 13, className: "w-full h-screen", children: [
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

export { Map as M };
//# sourceMappingURL=map-BMI19xbS.mjs.map
