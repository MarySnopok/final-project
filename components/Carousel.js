import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";

import { RouteCard } from "./RouteCard";

export const CarouselSlider = ({ routes, routeColors }) => {
  if (!routes || routes.length === 0) {
    console.log("no routes ", routes);
    return null;
  }
  console.log("routes >", routes);
  return (
    <View style={styles.container}>
      <Swiper>
        {routes.map((route) => (
          <RouteCard key={route.tags.name} route={route} color={routeColors[route.id]} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 2,
    left: 2,
    right: 2,
    height: "30%",
    alignItems: "stretch",
    justifyContent: "space-around",
    flex: 1,
  },
});
