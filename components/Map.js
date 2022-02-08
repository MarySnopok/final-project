import { useState, useEffect, useMemo } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Loader } from "../ui_fractions/Loader";
import { NoRoutes } from "../ui_fractions/NoRoutes";
import { CarouselSlider } from "./Carousel";
import { pickRandomBackground } from "../utils/constants";
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
      // we won't load anything, just hide loader
      dispatch(ui.actions.setLoading(false));
    } else {
      const locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      console.log("locationdata", locationData);

      console.log("lat", locationData.coords.latitude);
      console.log("long", locationData.coords.longitude);
      setCoordinates({ lat: locationData.coords.latitude, long: locationData.coords.longitude });

      await dispatch(
        fetchRoutes({
          lat: locationData.coords.latitude,
          long: locationData.coords.longitude,
        })
      );
      // hide loader when routes fetched
      dispatch(ui.actions.setLoading(false));
    }
  };
  console.log("routes", routes);

  // const routeColors = useMemo(() => {
  //   return routes.reduce((acc, val) => {
  //     return { ...acc, [val.id]: pickRandomBackground() };
  //   }, {});
  // }, [routes]);

  if (!routes.length && routesStatus === "fulfilled") {
    return <NoRoutes>Sorry no routes found near you</NoRoutes>;
  }

  // example from https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/DisplayLatLng.js
  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE = lat;
  const LONGITUDE = long;
  const LATITUDE_DELTA = 0.922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {routesStatus === "init" && <GeneralButton onPress={getLocation}>Search</GeneralButton>}
        {(routesStatus === "loading" || isLoading) && <Loader size={"large"} color={colors[0].loader} />}
      </View>
      <MapView
        style={styles.map}
        defaultZoom={10}
        userInterfaceStyle="dark"
        region={{ latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }}
      >
        {routes.map((route) =>
          route.members
            .filter((el) => el.type === "way")
            .map((geom) => (
              <MapView.Polyline
                key={geom.ref}
                path={geom.geometry.map((el) => ({ ...el, lng: el.lon }))}
                strokeColor={route.color} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={3}
                coordinates={geom.geometry.map((el) => ({ latitude: el.lat, longitude: el.lon }))}
                options={{
                  strokeColor: route.color,
                  strokeOpacity: 1,
                  strokeWeight: 3,
                }}
              />
            ))
        )}
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
