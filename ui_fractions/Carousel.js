import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import colors from "../utils/colors.json";
import { ConsentContainer } from "./ConsentContainer";
import { FavButton } from "./FavButton";

const backgrounds = {
  lightgreen: colors[0].lightGreen,
  lightblue: colors[0].lightBlue,
  lightpink: colors[0].lightPink,
  lightyellow: colors[0].lightYellow,
  lightviolet: colors[0].lightViolet,
  lightorange: colors[0].lightOrange,
};

const pickRandomBackground = (randomValue) => {
  if (randomValue === undefined || randomValue === randomValue) {
    const values = Object.values(backgrounds);
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return randomValue;
  }
};

export const CarouselSlider = () => {
  return (
    <View style={styles.container}>
      <Swiper>
        <View style={[styles.slideContainer, styles.slide1]}>
          <ConsentContainer style={{ alignItems: "stretch", justifyContent: "space-between" }}>
            <Text style={styles.typography}>Route Name</Text>
            <FavButton />
          </ConsentContainer>

          <View style={styles.detailsWrapper}>
            <Text style={styles.details}>distance: 15.5km</Text>
            <Text style={styles.details}>duration: 1.3h</Text>
            <Text style={styles.details}>difficulty: hard</Text>
          </View>
        </View>
        <View style={[styles.slideContainer, styles.slide2]}>
          <Text>Route Name</Text>
        </View>
        <View style={[styles.slideContainer, styles.slide3]}>
          <Text>Route Name</Text>
        </View>
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
  slideContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 8,
  },
  typography: {
    padding: 8,
    marginVertical: 18,
    marginHorizontal: 8,
    color: colors[0].dark,
    fontSize: 18,
    lineHeight: 20,
    zIndex: 12,
    textAlign: "center",
  },
  detailsWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    padding: 8,
    color: colors[0].dark,
    fontSize: 16,
    zIndex: 12,
  },
  slide1: {
    backgroundColor: pickRandomBackground(),
  },
  slide2: {
    backgroundColor: pickRandomBackground(),
  },
  slide3: {
    backgroundColor: pickRandomBackground(),
  },
});
