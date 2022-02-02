import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({ size, color }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

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
