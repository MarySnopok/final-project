import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";

export const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} defaultZoom={15} region={{ latitude: 37.8024, longitude: -122.4351 }}>
        <MapView.Polyline
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.7948605, longitude: -122.4596065 },
            { latitude: 37.8025259, longitude: -122.4351431 },
          ]}
          path={[
            { lat: 37.8025259, lng: -122.4351431 },
            { lat: 37.7896386, lng: -122.421646 },
            { lat: 37.7665248, lng: -122.4161628 },
          ]}
          strokeColor="#ff3333" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 40,
  },
});
