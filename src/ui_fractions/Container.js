import { StyleSheet, View } from "react-native";

export const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 12,
    margin: 8,
    padding: 8,
  },
});
