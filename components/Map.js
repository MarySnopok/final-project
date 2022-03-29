import { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { GeneralButton } from "../ui_fractions/GeneralButton";
import { Loader } from "../ui_fractions/Loader";
import { NoRoutes } from "../ui_fractions/NoRoutes";
import { CarouselSlider } from "./Carousel";
import colors from "../utils/colors";
import routes, {
  selectRoutes,
  selectRoutesStatus,
  fetchOneRoute,
} from "../reducers/routes";
import ui from "../reducers/ui";
import user, { getUserGeoLocation } from "../reducers/user";

import { MapView } from "./mapview";

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
    await dispatch(getUserGeoLocation());
  };

  // found routes
  console.log("routes", routes);

  const swiperRef = useRef(null);

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

  const coordinatesIsKnown = !(LATITUDE === 59.544 && LONGITUDE === 10.444);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {routesStatus === "init" && (
          <GeneralButton onPress={getLocation}>Search</GeneralButton>
        )}
        {(routesStatus === "loading" || isLoading) && (
          <Loader size={"large"} color={colors[0].loader} />
        )}
      </View>
      <MapView
        lat={LATITUDE}
        long={LONGITUDE}
        latDelta={LATITUDE_DELTA}
        longDelta={LONGITUDE_DELTA}
        routes={routes}
        coordinatesIsKnown={coordinatesIsKnown}
        onRouteClick={(route) => {
          console.log("route clicked", route);
        }}
      />
      {routes && <CarouselSlider swiperRef={swiperRef} routes={routes} />}
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
