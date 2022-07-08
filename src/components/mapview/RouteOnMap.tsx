import { useCallback } from "react";
import { Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { appState, openRouteScreen } from "../../reducers/app";
import { getRouteById } from "../../reducers/routes";
import { RouteId } from "../../types/BE.types";

import { makeOpaq } from "../../utils/constants";
export const RouteOnMap = ({ routeId }: { routeId: RouteId }) => {
  const dispatch = useDispatch();

  const route = useSelector(getRouteById(routeId));
  const onClick = useCallback(() => {
    dispatch(openRouteScreen(routeId));
  }, [routeId]);

  if (!route) {
    return null;
  }

  return (
    <>
      {route.route.map((geom) => (
        <Polyline
          onPress={onClick}
          key={geom.ref + route.id}
          path={geom.geometry.map((el) => ({
            lon: 0,
            lat: el.lat,
            lng: el.lon,
          }))}
          strokeColor={makeOpaq(route.color, 1)}
          // strokeColor={makeOpaq(route.color, selectedRoute ? (route === selectedRoute ? 1 : 0.4) : 1)}
          strokeWidth={3}
          coordinates={geom.geometry.map((el) => ({
            latitude: el.lat,
            longitude: el.lon,
          }))}
        />
      ))}
    </>
  );
};
