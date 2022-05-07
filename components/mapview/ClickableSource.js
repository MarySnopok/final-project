import { useEffect, useMemo } from "react";
import Map, { Source, Layer, Marker, useMap } from "react-map-gl";

const layerStyle = {
  type: "line",

  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

export const ClickableLayer = ({ route, selected, onClick }) => {
  const map = useMap();
  useEffect(() => {
    const m = map.current; // ??
    const listener = () => {
      onClick(route);
    };
    const layer = `layer-${route.id}`;

    m.on("click", layer, listener);
    return () => {
      m.off("click", layer, listener);
    };
  }, [route]);

  // transform coordinates into mapbox format
  const geoSource = useMemo(
    () => ({
      type: "FeatureCollection",
      key: route.id,
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
    }),
    [route]
  );

  return (
    <Source id={`source-${route.id}`} type="geojson" data={geoSource}>
      <Layer
        paint={{
          "line-color": route.color,
          "line-width": 8,
          "line-opacity": selected
            ? 1 // if we have selected route and it is
            : 0.4, // it is not selected route
        }}
        id={`layer-${route.id}`}
        {...layerStyle}
      />
    </Source>
  );
};
