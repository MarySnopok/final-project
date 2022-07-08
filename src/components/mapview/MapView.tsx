import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { useEffect, useRef } from "react";
import { boundsToRegion } from "../../utils/map";
import { FERoute } from "../../types/types";
import { RouteId } from "../../types/BE.types";
import { RouteOnMap } from "./RouteOnMap";

interface MapViewProps {
  boundaries: any;
  routes: RouteId[];
  onMove: () => void;
}

export const Map = ({ boundaries, routes, onMove }: MapViewProps) => {
  const mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    if (mapRef.current) {
      const region = boundsToRegion(boundaries);
      mapRef.current.animateToRegion(region);
    }
  }, [boundaries]);
  console.log('DISPLAY ROUTES', routes);
  return (
    <MapView
      onPanDrag={onMove}
      ref={mapRef}
      style={styles.map}
      // mapType="terrain"
      defaultZoom={10}
      userInterfaceStyle="dark"
      // region={{ latitude: lat, longitude: long, latitudeDelta: latDelta, longitudeDelta: longDelta }}
    >
      {routes.map(
        (route) => (
          <RouteOnMap routeId={route} key={route} />
        )
        // route.
        // uniqBy
        // .filter((el, i, arr) => arr.findIndex((e) => e.ref === el.ref) === i)
        // .map((geom) => (

        // ))
      )}
      {/* {coordinatesIsKnown ? (
          <Text>Start your search</Text>
        ) : (
          <Map.Marker key={2} coordinate={{ latitude: lat, longitude: long }} title={"your location"} pinColor={"tomato"} />
        )} */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%" },
});
