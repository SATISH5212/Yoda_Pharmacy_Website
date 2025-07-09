export const CordinatesToLocation = async (lat: number, lng: number): Promise<string> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.display_name || "Address not found";
    } catch (error) {
        console.error("Nominatim geocoding error:", error);
        return "Unable to fetch address";
    }
};