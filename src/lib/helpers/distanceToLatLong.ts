
const covertXYToLatLng = (homeLat: number, homeLon: number, x: number, y: number) => {
    const METERS_PER_DEGREE_LAT = 110540;
    const METERS_PER_DEGREE_LON = 111320;
    const dLat = y / METERS_PER_DEGREE_LAT;
    const dLon = x / (Math.cos(homeLat * Math.PI / 180) * METERS_PER_DEGREE_LON);
    const lat = homeLat + dLat;
    const lng = homeLon + dLon;
    return { lat, lng };

}

export default covertXYToLatLng;