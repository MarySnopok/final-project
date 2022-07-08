import { useEffect, useMemo } from "react";
import Map, { Source, Layer, Marker, useMap } from "react-map-gl";

const layerStyle = {
  type: "line",

  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

const pointStyle = {
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
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
      features: route.route
        // .filter((el) => el.type === "way")
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

  const geoStart = {
    type: "FeatureCollection",
    features: route.edges.map((edge) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [edge.lon, edge.lat] },
    })),
  };

  return (
    <>
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
      <Source id={`source-start-${route.id}`} type="geojson" data={geoStart}>
        <Layer
          // paint={{
          //   "line-color": route.color,
          //   "line-width": 8,
          //   "line-opacity": selected
          //     ? 1 // if we have selected route and it is
          //     : 0.4, // it is not selected route
          // }}
          id={`layer-start-${route.id}`}
          {...pointStyle}
        />
      </Source>
    </>
  );
};
