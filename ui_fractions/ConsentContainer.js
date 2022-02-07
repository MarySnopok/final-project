import { StyleSheet, View } from "react-native";

export const ConsentContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 12,
    // margin: 8,
    padding: 8,
  },
});
