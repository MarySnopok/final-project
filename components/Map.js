import { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Loader } from "../ui_fractions/Loader";
import { NoRoutes } from "../ui_fractions/NoRoutes";
import { CarouselSlider } from "./Carousel";
import colors from "../utils/colors";
import routes, { fetchRoutes, selectRoutes, selectRoutesStatus, fetchOneRoute } from "../reducers/routes";
import ui from "../reducers/ui";
import user from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { useParams } from "react-router";

export const Map = () => {
  const dispatch = useDispatch();
  const coordinates = useSelector((store) => store.user.coordinates);
  const routesStatus = useSelector(selectRoutesStatus);
  const routes = useSelector(selectRoutes);
  const isLoading = useSelector((store) => store.ui.loading);

  // *** for individual route rendering
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(ui.actions.setLoading(true));
      dispatch(fetchOneRoute(id)).then(() => {
        dispatch(ui.actions.setLoading(false));
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(ui.actions.setLoading(false));
  }, [dispatch]);

  const getLocation = async () => {
    dispatch(ui.actions.setLoading(true));
    const data = await Location.requestForegroundPermissionsAsync();
    if (data.status !== "granted") {
      // permition was not granted - hiding loader
      dispatch(ui.actions.setLoading(false));
    } else {
      const locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      // user geodata
      console.log("locationdata", locationData);
      console.log("lat", locationData.coords.latitude);
      console.log("long", locationData.coords.longitude);
      dispatch(user.actions.setCoordinates({ lat: locationData.coords.latitude, long: locationData.coords.longitude }));

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

  // found routes
  console.log("routes", routes);

  if (!routes.length && routesStatus === "fulfilled") {
    return <NoRoutes>Sorry no routes found near you</NoRoutes>;
  }

  // example from https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/DisplayLatLng.js
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = coordinates.lat;
  const LONGITUDE = coordinates.long;
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
            // uniqBy
            .filter((el, i, arr) => arr.findIndex((e) => e.ref === el.ref) === i)
            .map((geom) => (
              <MapView.Polyline
                key={geom.ref + route.id}
                path={geom.geometry.map((el) => ({ ...el, lng: el.lon }))}
                strokeColor={route.color}
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
        {LATITUDE === 59.544 && LONGITUDE === 10.444 ? (
          <Text>Start your search</Text>
        ) : (
          <MapView.Marker key={2} coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }} title={"your location"} pinColor={"orange"} />
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
