import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Loader } from "../ui_fractions/Loader";
import { NoRoutes } from "../ui_fractions/NoRoutes";
import { CarouselSlider } from "./Carousel";
import colors from "../utils/colors";

import routes, { fetchRoutes, selectRoutes, selectRoutesStatus } from "../reducers/routes";
import ui, { setLoading, setError } from "../reducers/ui";
import { useDispatch, useSelector } from "react-redux";

import * as Location from "expo-location";

// temporary lang and lot
// const lat = 59.122;
// const long = 18.108;

// let lat = 12.544;
// let long = 100.444;

export const Map = () => {
  const [{ lat, long }, setCoordinates] = useState({ lat: 59.544, long: 10.444 });
  const dispatch = useDispatch();
  const routesStatus = useSelector(selectRoutesStatus);
  const routes = useSelector(selectRoutes);
  const isLoading = useSelector((store) => store.ui.loading);

  useEffect(() => {
    dispatch(ui.actions.setLoading(false));
  }, [dispatch]);

  const getLocation = async () => {
    // console.time("foo");
    dispatch(ui.actions.setLoading(true));
    const data = await Location.requestForegroundPermissionsAsync();
    // console.timeEnd("foo");
    if (data.status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      const locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      console.log("locationdata", locationData);

      console.log("lat", locationData.coords.latitude);
      console.log("long", locationData.coords.longitude);
      setCoordinates({ lat: locationData.coords.latitude, long: locationData.coords.longitude });

      dispatch(
        fetchRoutes({
          lat: locationData.coords.latitude,
          long: locationData.coords.longitude,
        })
      );
    }
    dispatch(ui.actions.setLoading(false));
  };
  console.log("routes", routes);

  if (!routes.length && routesStatus === "fulfilled") {
    return <NoRoutes>Sorry no routes found near you</NoRoutes>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {routesStatus === "init" && <GeneralButton onPress={getLocation}>Search</GeneralButton>}
        {(routesStatus === "loading" || isLoading) && <Loader size={100} color={colors[0].primary} />}
      </View>
      <MapView style={styles.map} defaultZoom={10} region={{ latitude: lat, longitude: long }}>
        {routes.map((route) =>
          route.members
            .filter((el) => el.type === "way")
            .map((geom) => (
              <MapView.Polyline
                key={geom.ref}
                path={geom.geometry.map((el) => ({ ...el, lng: el.lon }))}
                strokeColor={colors[0].secondary} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
                coordinates={geom.geometry.map((el) => ({ latitude: el.lat, longitude: el.lon }))}
              />
            ))
        )}
        {/* <MapView.Polyline
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
        /> */}
      </MapView>
      {routes && <CarouselSlider routes={routes} />}
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
  map: { flex: 1, width: "100%" },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 100,
    right: 100,
    height: 100,
    zIndex: 5,
  },
});
