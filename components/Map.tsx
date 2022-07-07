import { useCallback, useEffect, useRef, useState, useMemo } from "react";
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
  selectResult,
} from "../reducers/routes";
import ui from "../reducers/ui";
import user from "../reducers/user";

import { Map } from "./mapview";
import { SearchSvg } from "../ui_fractions/svg_components/SearchSvg";

export const MapMain = ({ onMove, magicNumber }: { onMove: () => void; magicNumber: number }) => {
  // const [selectedRoute, setSelectedRoute] = useState(0);
  // const [overview, setOverview] = useState(true); // TODO
  // const dispatch = useDispatch();
  const coordinates = useSelector((store) => store.geo.currentLocation);
  // const routesStatus = useSelector(selectRoutesStatus);
  // const routes = useSelector(selectRoutes);
  // const isLoading = useSelector((store) => store.ui.loading);

  // // *** for individual route rendering
  // const { id } = useParams();
  // useEffect(() => {
  //   if (id) {
  //     dispatch(ui.actions.setLoading(true));
  //     dispatch(fetchOneRoute(id)).then(() => {
  //       dispatch(ui.actions.setLoading(false));
  //     });
  //   }
  // }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(ui.actions.setLoading(false));
  // }, [dispatch]);

  // const getLocation = async () => {
  //   await dispatch(getUserGeoLocation());
  // };

  // const swiperRef = useRef(null);
  // const onRouteClick = useCallback((route) => {
  //   const routeIndex = routes.indexOf(route);
  //   setSelectedRoute(routeIndex);
  //   setOverview(false);
  //   if (swiperRef.current) {
  //     // todo: fix this since it's working far from always
  //     // to be more precise: it is not mounted
  //     // unless overview is false
  //     // therefore swiperRef.current is false
  //     swiperRef.current.goTo(routeIndex);
  //   }
  // }, [routes]);

  const searchResult = useSelector(selectResult);

  // // example from https://github.com/react-native-maps/react-native-maps/blob/master/example/examples/DisplayLatLng.js
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE = coordinates?.lat || 59.544;
  const LONGITUDE = coordinates?.lon || 10.444;
  const LATITUDE_DELTA = 0.922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const coordinatesIsKnown = !!coordinates;

  const overallBoundaries = useMemo(() => {
    return {
      maxlat: LATITUDE + LATITUDE_DELTA,
      minlat: LATITUDE - LATITUDE_DELTA,
      maxlon: LONGITUDE + LONGITUDE_DELTA,
      minlon: LONGITUDE - LONGITUDE_DELTA,
      __hack: magicNumber
    };
  }, [LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA, magicNumber]);

  // calculating view
  // if we have routes -- default view must include (fit) all of them
  // otherwise it should show area around some default point
  // const overallBoundaries = useMemo(() => {
  //   if (routes.length <= 0) {
  //     return {
  //       maxlat: LATITUDE + LATITUDE_DELTA,
  //       minlat: LATITUDE - LATITUDE_DELTA,
  //       maxlon: LONGITUDE + LONGITUDE_DELTA,
  //       minlon: LONGITUDE - LONGITUDE_DELTA,
  //     }
  //   }
  //   let boundaries = { ...routes[0].bounds}; // copy them into object since we would mutate it
  //   for (let { bounds } of routes) {
  //       boundaries.maxlon = Math.max(boundaries.maxlon, bounds.maxlon);
  //       boundaries.maxlat = Math.max(boundaries.maxlat, bounds.maxlat);
  //       boundaries.minlon = Math.min(boundaries.minlon, bounds.minlon);
  //       boundaries.minlat = Math.min(boundaries.minlat, bounds.minlat);

  //   }
  //   return boundaries;
  // }, [routes]);

  // if (!routes.length && routesStatus === "fulfilled") {
  //   return <NoRoutes>Sorry no routes found near you</NoRoutes>;
  // }

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        {routesStatus === "init" && (
          <GeneralButton onPress={getLocation}>Search</GeneralButton>
        )}
        {(routesStatus === "loading" || isLoading) && (
          <Loader size={"large"} color={colors[0].loader} />
        )}
      </View> */}
      {/* {routesStatus === "fulfilled" &&
        !overview &&
          <View style={styles.overviewButtonContainer}>
            <GeneralButton onPress={() => setOverview(true)}>
              Overview
            </GeneralButton>
          </View>
        } */}
      <Map
        onMove={onMove}
        // lat={LATITUDE}
        // long={LONGITUDE}
        // latDelta={LATITUDE_DELTA}
        // longDelta={LONGITUDE_DELTA}
        routes={searchResult.routes}
        // coordinatesIsKnown={coordinatesIsKnown}
        // selectedRoute={!overview && routes.length && routes[selectedRoute]}
        // onRouteClick={onRouteClick}
        boundaries={overallBoundaries}
        // boundaries={overview ? overallBoundaries : routes[selectedRoute].bounds}
      />
      {/* {routes && !overview && (
        <CarouselSlider
          onSelectedRouteChange={setSelectedRoute}
          swiperRef={swiperRef}
          routes={routes}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    zIndex: 0,
    position: "absolute",
    backgroundColor: "#ff0000",
    ...StyleSheet.absoluteFill,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 100,
    right: 100,
    height: 100,
    zIndex: 5,
  },
  overviewButtonContainer: {
    position: "absolute",
    bottom: 250,
    left: 100,
    right: 100,
    height: 100,
    zIndex: 5,
  },
  large: {
    height: 24,
    width: 24,
  },
});
