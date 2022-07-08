import React from "react";
import { StyleSheet, View } from "react-native";

export const LayoutRoot: React.FC<{
  round?: boolean;
  children: React.ReactNode;
}> = ({ children, round }) => (
  <View style={[styles.container, round && styles.round]}>{children}</View>
);

export const LayoutFlex = ({ children }) => (
  <View style={styles.flex}>{children}</View>
);

export const LayoutFixed = ({ children, height }) => (
  <View style={{ height }}>{children}</View>
);

export const LayoutNavbar = ({ children }) => (
  <View style={{ height: 70 }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  round: {
    borderRadius: 8,
  },
  flex: {
    flex: 1,
  },
});
