import { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, { Marker } from "react-map-gl";
import { ClickableLayer } from "./ClickableSource";

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
            padding: { top: 10, bottom: 240, left: 15, right: 5 },
          });
        }
      }, 1);
    }
  }, [boundaries]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 10,
      }}
      mapboxAccessToken="pk.eyJ1IjoiY29yZXltYWxlciIsImEiOiJjbDFjZ3E1OGswN2x6M2RqcGJobm0wbG4yIn0.heKn_mFlXKoEQvAG1bSPCQ"
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
      {coordinatesIsKnown && <Marker longitude={long} latitude={lat} />}
    </Map>
  );
};
