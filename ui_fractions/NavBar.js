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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 8,
    zIndex: 4,
    maxHeight: 50,
    maxWidth: Dimensions.get("window").width,
    marginBottom: 40,
  },
});
