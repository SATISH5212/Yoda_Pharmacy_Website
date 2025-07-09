import { CordinatesToLocation } from "@/lib/helpers/latLongToLocation";
import { Coordinates } from "@/lib/interfaces/fields";
import * as turf from "@turf/turf";
import { useCallback, useState } from "react";
const ACRES_CONVERSION_FACTOR = 4046.86;
export const usePolygonCalculations = () => {
    const [geocodingStatus, setGeocodingStatus] = useState<string>("");
    const calculateAreaAndLocation = useCallback(
        async (path: Coordinates[]) => {
            if (path.length < 3) {
                return null;
            }
            try {
                setGeocodingStatus("Calculating area and location...");
                const coordinates: [number, number][] = [
                    ...path.map((p): [number, number] => [p.lng, p.lat]),
                    [path[0].lng, path[0].lat],
                ]
                const turfPoly = turf.polygon([coordinates]);
                const areaInSquareMeters = turf.area(turfPoly);
                const areaInAcres = areaInSquareMeters / ACRES_CONVERSION_FACTOR;
                const centroid = turf.centroid(turfPoly);
                const [lngC, latC] = centroid.geometry.coordinates;
                const location = await CordinatesToLocation(latC, lngC);
                const result = {
                    location,
                    area: areaInAcres.toFixed(2),
                    centroid: { lat: latC, lng: lngC },
                };
                setGeocodingStatus("");
                return result;
            } catch (error) {
                setGeocodingStatus("Error calculating area and location");
            }
        },
        []
    );
    return { calculateAreaAndLocation, geocodingStatus };
};