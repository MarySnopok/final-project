import { StyleSheet, View } from "react-native";
import colors from "../utils/colors.json";

export const ConsentContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 12,
    padding: 8,
    textAlign: "center",
    backgroundColor: colors[0].dark,
  },
});
