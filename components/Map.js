import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Loader } from "../ui_fractions/Loader";

import routes, { fetchRoutes, selectRoutes, selectRoutesStatus } from "../reducers/routes";
import { useDispatch, useSelector } from "react-redux";

// temporary lang and lot
const lat = 59.122;
const long = 18.108;

export const Map = () => {
  const dispatch = useDispatch();
  const routesStatus = useSelector(selectRoutesStatus);
  const routes = useSelector(selectRoutes);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {routesStatus === "init" && (
          <GeneralButton
            onPress={() =>
              dispatch(
                fetchRoutes({
                  lat,
                  long,
                })
              )
            }
          >
            Find near routes
          </GeneralButton>
        )}
        {routesStatus === "loading" && <Loader />}
      </View>
      <MapView style={styles.map} defaultZoom={10} region={{ latitude: lat, longitude: long }}>
        {routes.map((route) => (
          <MapView.Polyline
            path={route.members
              .filter((el) => el.type === "way")
              .flatMap((mem) => mem.geometry)
              .map((el) => ({ ...el, lng: el.lon }))}
            strokeColor="#ff3333" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        ))}
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
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 40,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 5,
  },
});
