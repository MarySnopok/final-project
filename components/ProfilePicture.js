import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { PicturePicker } from "./PicturePicker";
import colors from "../utils/colors.json";

export const ProfilePicture = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{children}</Text>
      <PicturePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors[0].transparent,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: colors[0].white,
    fontSize: 20,
    fontWeight: "bold",
    padding: 12,
  },
});
