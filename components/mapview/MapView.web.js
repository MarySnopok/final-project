import { useCallback, useMemo, useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Source, Layer, Marker } from "react-map-gl";

const layerStyle = {
  type: "line",

  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

export const MapView = ({
  lat,
  long,
  routes,
  coordinatesIsKnown,
  onRouteClick,
  selectedRoute,
  boundaries,
}) => {
  const mapRef = useRef();

  useEffect(() => {
    if (routes.length && mapRef.current) {
      const listeners = routes.map((route) => {
        const layerId = `layer-${route.id}`;
        const listener = () => {
          onRouteClick(route);
        };
        mapRef.current.on("click", layerId, listener);
        return [layerId, listener];
      });

      return () => {
        listeners.forEach(([layerId, listener]) => {
          mapRef.current.off("click", layerId), listener;
        });
      };
    }
  }, [routes]);

  useEffect(() => {
    if (mapRef.current && boundaries) {
      const bbox = [
        [boundaries.maxlon, boundaries.maxlat],
        [boundaries.minlon, boundaries.minlat],
      ];
      mapRef.current.fitBounds(bbox, {
        padding: { top: 10, bottom: 240, left: 15, right: 5 },
      });
    }
  }, [boundaries]);

  // transform coordinates into mapbox format
  const geojsons = useMemo(
    () =>
      (routes ?? []).map((route) => ({
        type: "FeatureCollection",
        key: route.id,
        origin: route,
        color: route.color,
        features: route.members
          .filter((el) => el.type === "way")
          .filter((el, i, arr) => arr.findIndex((e) => e.ref === el.ref) === i)
          .map((geom) => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: geom.geometry.map((g) => [g.lon, g.lat]),
            },
          })),
      })),
    [routes]
  );

  return (
    <Map
      ref={mapRef}
      // onLoad={onMapLoad}
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 10,
      }}
      mapboxAccessToken="pk.eyJ1IjoiY29yZXltYWxlciIsImEiOiJjbDFjZ3E1OGswN2x6M2RqcGJobm0wbG4yIn0.heKn_mFlXKoEQvAG1bSPCQ"
      // style={{ width: 600, height: 400 }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      {geojsons.map((gs) => (
        <Source key={gs.key} id={`source-${gs.key}`} type="geojson" data={gs}>
          <Layer
            paint={{
              "line-color": gs.color,
              "line-width": 8,
              "line-opacity": selectedRoute
                ? gs.origin === selectedRoute
                  ? 1 // if we have selected route and it is 
                  : 0.4 // it is not selected route
                : 1, // we don't have selected route at all
            }}
            id={`layer-${gs.key}`}
            {...layerStyle}
          />
        </Source>
      ))}
      {coordinatesIsKnown && <Marker longitude={long} latitude={lat} />}
    </Map>
  );
};
