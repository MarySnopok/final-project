import { useRef, useEffect, useCallback, useMemo } from "react";
import Constants from "expo-constants";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Marker, Source, Layer } from "react-map-gl";
import { ClickableLayer } from "./ClickableSource";
import { pulsingDot } from "./PulsingDot";

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

  const onLoad = useCallback((event) => {
    const map = event.target;
    map.addImage("pulsing-dot", pulsingDot(map), { pixelRatio: 2 });
  });

  const isFirstCoordsUpdate = useRef(true);
  useEffect(() => {
    if (isFirstCoordsUpdate.current) {
      isFirstCoordsUpdate.current = false;
      return;
    }
    if (mapRef.current) {
      // flyTo eases out to a wider zoom before flying to the new
      // location and zooming back in, instead of jump-cutting there
      mapRef.current.flyTo({ center: [long, lat], zoom: 12, essential: true });
    }
  }, [lat, long]);

  useEffect(() => {
    if (mapRef.current && boundaries) {
      const bbox = [
        [boundaries.maxlon, boundaries.maxlat],
        [boundaries.minlon, boundaries.minlat],
      ];
      setTimeout(() => {
        // fix weird bug: when we press "overview" map "feels" your
        // touch through the button and thinks that you are dragging
        // map itself, which cancels fitBounds.
        // delaying this animation after button is released allows
        // to prevent map from thinking that your dragging map itself
        if (mapRef.current) {
          mapRef.current.fitBounds(bbox, {
            padding: { top: 10, bottom: selectedRoute ? 240 : 10, left: 15, right: 5 },
          });
        }
      }, 1);
    }
  }, [boundaries]);

  const currentPositionGeoJson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
        },
      ],
    }),
    [long, lat]
  );

  return (
    <Map
      ref={mapRef}
      onLoad={onLoad}
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 10,
      }}
      mapboxAccessToken={Constants.manifest.extra.mapboxToken}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      {routes.map((route) => (
        <ClickableLayer
          route={route}
          onClick={onRouteClick}
          key={route.id}
          selected={!selectedRoute || route === selectedRoute}
        />
      ))}
      {coordinatesIsKnown && (
        <Source type="geojson" data={currentPositionGeoJson}>
          <Layer
            id="layer-with-pulsing-dot"
            type="symbol"
            layout={{
              "icon-image": "pulsing-dot",
            }}
          />
        </Source>
      )}
    </Map>
  );
};
