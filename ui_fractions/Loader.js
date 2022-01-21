import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({ size, color }) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
