import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ui from "../reducers/ui";

export const Loader = ({ size, color }) => {
  const loading = useSelector((store) => store.ui.loading);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 20,
    position: "absolute",
    top: -400,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
