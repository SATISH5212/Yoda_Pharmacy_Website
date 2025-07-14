import { toast } from "sonner";
import { CordinatesToLocation } from "./latLongToLocation";

const searchStringToLocation = async (searchString: string, setMapCenter: any, setSearchMarker: any, setMarkerAddress: any,) => {
    if (!searchString) return;
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchString)}&limit=1`
        );
        const data = await res.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            const point = { lat, lng };
            setMapCenter(point);
            setSearchMarker(point);
            const address = await CordinatesToLocation(lat, lng);
            setMarkerAddress(address);
        } else {
            toast.info("No location found for search query.");
        }
    } catch (error) {

        console.error("Error during location search:", error);
    }
};

export default searchStringToLocation;