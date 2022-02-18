import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-web-swiper";
import { RouteCard } from "./RouteCard";

export const CarouselSlider = ({ routes, swiperRef }) => {
  if (!routes || routes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef}>
        {routes.map((route) => (
          <RouteCard key={route.tags.name} route={route} />
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
