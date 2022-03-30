import React from "react";
import { View, StyleSheet } from "react-native";
import { CrossLinks } from "./CrossLinks";
import { ConsentContainer } from "./ConsentContainer";

export const UserProfileLogOut = ({ children }) => {
  return (
    <ConsentContainer>
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
    left: 150,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
