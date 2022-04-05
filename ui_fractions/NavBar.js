import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../utils/colors.json";

export const NavBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: colors[0].secondary,
    backgroundColor: colors[0].dark,
    borderTopWidth: 2,
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 8,
    zIndex: 4,
  },
});
