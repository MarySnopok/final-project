import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import colors from "../utils/colors.json";
import { ConsentContainer } from "../ui_fractions/ConsentContainer";
import { FavButton } from "../ui_fractions/FavButton";

const backgrounds = {
  lightgreen: colors[0].lightGreen,
  lightblue: colors[0].lightBlue,
  lightpink: colors[0].lightPink,
  lightyellow: colors[0].lightYellow,
  lightviolet: colors[0].lightViolet,
  lightorange: colors[0].lightOrange,
};

let leftColors = Object.values(backgrounds);

const pickRandomBackground = () => {
  const color = leftColors[Math.floor(Math.random() * leftColors.length)];
  leftColors.splice(leftColors.indexOf(color), 1);
  if (leftColors.length === 0) {
    leftColors = Object.values(backgrounds);
  }
  return color;
};

export const RouteCard = ({ route }) => {
  return (
    <View key={route.tags.name} style={[styles.slideContainer, styles.slide1, { backgroundColor: pickRandomBackground() }]}>
      <ConsentContainer style={{ alignItems: "stretch", justifyContent: "space-between" }}>
        <Text style={styles.typography}>{route.tags.name}</Text>
        <FavButton />
      </ConsentContainer>
      <View style={styles.detailsWrapper}>
        {route.tags.route !== undefined && <Text style={styles.details}>{route.tags.route} trail</Text>}
        {route.tags.distance !== undefined && <Text style={styles.details}>{parseInt(route.tags.distance, 10)} km</Text>}
        {route.tags.distance !== undefined && <Text style={styles.details}>{Math.round(parseInt(route.tags.distance, 10) / 6)} hr</Text>}
        {route.tags.distance !== undefined && parseInt(route.tags.distance, 10) >= 12 ? (
          <Text style={styles.details}>high difficulty</Text>
        ) : (
          <Text style={styles.details}>moderate difficulty</Text>
        )}
      </View>
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
    justifyContent: "flex-start",
    fontSize: 18,
    // paddingBottom: 16,
  },
  details: {
    padding: 6,
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
