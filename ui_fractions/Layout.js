import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LayoutRoot = ({ children }) => <View style={styles.container}>{children}</View>;

export const LayoutFlex = ({ children }) => <View style={styles.flex}>{children}</View>;

export const LayoutFixed = ({ children, height }) => <View style={{ height }}>{children}</View>;

export const LayoutNavbar = ({ children }) => <View style={{ height: 70 }}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
