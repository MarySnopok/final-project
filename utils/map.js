export const boundsToRegion = (bounds) => {
    const latDelta = bounds.maxlat - bounds.minlat;
    const lonDelta = bounds.maxlon - bounds.minlon;

    // not sure if it would work on south hemisphere
    return {
        latitude: bounds.minlat + latDelta / 2, // center of latitude
        longitude: bounds.minlon + lonDelta / 2, // center of long
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta,
    }
}