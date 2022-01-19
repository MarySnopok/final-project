import { StyleSheet, View } from "react-native";

export const ConsentContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 12,
    margin: 20,
    padding: 8,
  },
});
