import Map from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { makeOpaq } from '../../utils/constants';
import { useEffect, useRef } from "react";
import { boundsToRegion } from "../../utils/map";

export const MapView = ({lat, long, routes, latDelta, longDelta, coordinatesIsKnown, onRouteClick, boundaries, selectedRoute}) => {
  const mapRef = useRef();
  // useEffect(() => {
  //   if (mapRef.current) {
  //     const region = boundsToRegion(boundaries);
  //     mapRef.current.animateToRegion(region);
  //   }
  // }, [boundaries])
  return (
      <Map
      ref={mapRef}
        style={styles.map}
        // mapType="terrain"
        defaultZoom={10}
        userInterfaceStyle="dark"
        // region={{ latitude: lat, longitude: long, latitudeDelta: latDelta, longitudeDelta: longDelta }}
      >
        {/* {routes.map((route) =>
          route.members
            .filter((el) => el.type === "way")
            // uniqBy
            .filter((el, i, arr) => arr.findIndex((e) => e.ref === el.ref) === i)
            .map((geom) => (
              <Map.Polyline
                onPress={() => onRouteClick(route)}
                key={geom.ref + route.id}
                path={geom.geometry.map((el) => ({ ...el, lng: el.lon }))}
                strokeColor={makeOpaq(route.color, selectedRoute ? (route === selectedRoute ? 1 : 0.4) : 1)}
                strokeWidth={3}
                coordinates={geom.geometry.map((el) => ({ latitude: el.lat, longitude: el.lon }))}
              />
            ))
        )}
        {coordinatesIsKnown ? (
          <Text>Start your search</Text>
        ) : (
          <Map.Marker key={2} coordinate={{ latitude: lat, longitude: long }} title={"your location"} pinColor={"tomato"} />
        )} */}
      </Map>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%" },
});
