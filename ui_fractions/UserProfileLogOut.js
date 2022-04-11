import React from "react";
import colors from "../utils/colors.json";
import { View, StyleSheet, Text } from "react-native";
import { CrossLinks } from "./CrossLinks";
import { ConsentContainer } from "./ConsentContainer";

export const UserProfileLogOut = ({ children }) => {
  return (
    <ConsentContainer>
      <View style={styles.signOut}>
        <Text style={styles.typography}>Sign Out</Text>
      </View>
      <View style={styles.corner}>
        <CrossLinks routes={children} />
      </View>
    </ConsentContainer>
  );
};

const styles = StyleSheet.create({
  large: {
    height: 24,
    width: 24,
  },
  corner: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    left: 120,
    right: 0,
    top: 0,
    bottom: 0,
  },
  typography: {
    color: colors[0].loader,
    fontSize: 16,
    fontWeight: "bold",
  },
  signOut: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    left: 115,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
